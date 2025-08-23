const mongoose = require('mongoose');

// Configuration constants
const CONFIG = {
  RETRY_ATTEMPTS: process.env.MONGO_RETRY_ATTEMPTS || 5,
  INITIAL_DELAY: process.env.MONGO_INITIAL_DELAY || 1000,
  CONNECTION_TIMEOUT: process.env.MONGO_CONNECTION_TIMEOUT || 30000,
  SOCKET_TIMEOUT: process.env.MONGO_SOCKET_TIMEOUT || 45000,
  SERVER_SELECTION_TIMEOUT: process.env.MONGO_SERVER_SELECTION_TIMEOUT || 30000,
  MAX_POOL_SIZE: process.env.MONGO_MAX_POOL_SIZE || 10,
  MIN_POOL_SIZE: process.env.MONGO_MIN_POOL_SIZE || 2,
  MAX_IDLE_TIME: process.env.MONGO_MAX_IDLE_TIME || 30000,
  CIRCUIT_BREAKER_THRESHOLD: process.env.MONGO_CIRCUIT_BREAKER_THRESHOLD || 5,
  CIRCUIT_BREAKER_TIMEOUT: process.env.MONGO_CIRCUIT_BREAKER_TIMEOUT || 60000
};

// Connection state management
let connectionState = {
  isConnected: false,
  isConnecting: false,
  lastError: null,
  retryCount: 0,
  circuitBreakerState: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
  circuitBreakerFailures: 0,
  lastCircuitBreakerReset: Date.now(),
  healthCheck: {
    lastCheck: null,
    responseTime: null,
    status: 'unknown'
  }
};

// Custom error classes
class DatabaseConnectionError extends Error {
  constructor(message, cause, retryCount = 0) {
    super(message);
    this.name = 'DatabaseConnectionError';
    this.cause = cause;
    this.retryCount = retryCount;
    this.timestamp = new Date().toISOString();
  }
}

class DatabaseTimeoutError extends Error {
  constructor(operation, timeout) {
    super(`Database operation '${operation}' timed out after ${timeout}ms`);
    this.name = 'DatabaseTimeoutError';
    this.operation = operation;
    this.timeout = timeout;
    this.timestamp = new Date().toISOString();
  }
}

class CircuitBreakerError extends Error {
  constructor() {
    super('Circuit breaker is OPEN - too many consecutive failures');
    this.name = 'CircuitBreakerError';
    this.timestamp = new Date().toISOString();
  }
}

// Circuit breaker implementation
const circuitBreaker = {
  isOpen() {
    return connectionState.circuitBreakerState === 'OPEN';
  },

  isHalfOpen() {
    return connectionState.circuitBreakerState === 'HALF_OPEN';
  },

  recordSuccess() {
    connectionState.circuitBreakerFailures = 0;
    connectionState.circuitBreakerState = 'CLOSED';
    connectionState.lastCircuitBreakerReset = Date.now();
  },

  recordFailure() {
    connectionState.circuitBreakerFailures++;
    if (connectionState.circuitBreakerFailures >= CONFIG.CIRCUIT_BREAKER_THRESHOLD) {
      connectionState.circuitBreakerState = 'OPEN';
      console.error(`🚨 Circuit breaker OPEN after ${connectionState.circuitBreakerFailures} failures`);
      
      // Schedule transition to HALF_OPEN
      setTimeout(() => {
        if (connectionState.circuitBreakerState === 'OPEN') {
          connectionState.circuitBreakerState = 'HALF_OPEN';
          console.log('🔄 Circuit breaker transitioned to HALF_OPEN');
        }
      }, CONFIG.CIRCUIT_BREAKER_TIMEOUT);
    }
  }
};

// Enhanced connection function with retry logic
const connectWithRetry = async (retries = CONFIG.RETRY_ATTEMPTS, delay = CONFIG.INITIAL_DELAY) => {
  if (connectionState.isConnecting) {
    console.log('⏳ Connection already in progress, waiting...');
    return;
  }

  if (circuitBreaker.isOpen()) {
    throw new CircuitBreakerError();
  }

  connectionState.isConnecting = true;
  connectionState.lastError = null;

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 MongoDB connection attempt ${i + 1}/${retries}...`);
      
      const startTime = Date.now();
      
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: CONFIG.SERVER_SELECTION_TIMEOUT,
        socketTimeoutMS: CONFIG.SOCKET_TIMEOUT,
        connectTimeoutMS: CONFIG.CONNECTION_TIMEOUT,
        maxPoolSize: CONFIG.MAX_POOL_SIZE,
        minPoolSize: CONFIG.MIN_POOL_SIZE,
        maxIdleTimeMS: CONFIG.MAX_IDLE_TIME,
        retryWrites: true,
        retryReads: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      });

      const connectionTime = Date.now() - startTime;
      
      connectionState.isConnected = true;
      connectionState.isConnecting = false;
      connectionState.retryCount = 0;
      connectionState.healthCheck.lastCheck = new Date();
      connectionState.healthCheck.responseTime = connectionTime;
      connectionState.healthCheck.status = 'connected';
      
      circuitBreaker.recordSuccess();
      
      console.log(`✅ MongoDB connected successfully in ${connectionTime}ms`);
      console.log(`📊 Connection pool size: ${CONFIG.MAX_POOL_SIZE}, Min pool: ${CONFIG.MIN_POOL_SIZE}`);
      
      return;
      
    } catch (error) {
      const errorMessage = error.message || 'Unknown connection error';
      console.error(`❌ MongoDB connection attempt ${i + 1} failed:`, errorMessage);
      
      connectionState.lastError = error;
      connectionState.retryCount = i + 1;
      connectionState.healthCheck.status = 'disconnected';
      
      circuitBreaker.recordFailure();
      
      if (i === retries - 1) {
        connectionState.isConnecting = false;
        connectionState.isConnected = false;
        
        const finalError = new DatabaseConnectionError(
          `All MongoDB connection attempts failed after ${retries} retries`,
          error,
          retries
        );
        
        console.error('🚨 All MongoDB connection attempts failed');
        console.error('📋 Final error details:', {
          message: finalError.message,
          cause: finalError.cause?.message,
          retryCount: finalError.retryCount,
          timestamp: finalError.timestamp
        });
        
        // Don't exit process, let the application handle the error
        throw finalError;
      }
      
      // Exponential backoff with jitter
      const backoffDelay = delay * Math.pow(2, i) + Math.random() * 1000;
      console.log(`⏰ Waiting ${Math.round(backoffDelay)}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }
};

// Health check function
const checkDatabaseHealth = async () => {
  const startTime = Date.now();
  
  try {
    if (!mongoose.connection.readyState) {
      return {
        status: 'disconnected',
        message: 'Database connection not established',
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        details: {
          readyState: mongoose.connection.readyState,
          circuitBreakerState: connectionState.circuitBreakerState,
          lastError: connectionState.lastError?.message
        }
      };
    }

    // Perform a simple ping operation
    await mongoose.connection.db.admin().ping();
    
    const responseTime = Date.now() - startTime;
    
    connectionState.healthCheck.lastCheck = new Date();
    connectionState.healthCheck.responseTime = responseTime;
    connectionState.healthCheck.status = 'connected';
    
    return {
      status: 'connected',
      message: 'Database is healthy',
      responseTime,
      timestamp: new Date().toISOString(),
      details: {
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name,
        circuitBreakerState: connectionState.circuitBreakerState
      }
    };
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    connectionState.healthCheck.status = 'error';
    connectionState.lastError = error;
    
    return {
      status: 'error',
      message: 'Database health check failed',
      responseTime,
      timestamp: new Date().toISOString(),
      details: {
        error: error.message,
        readyState: mongoose.connection.readyState,
        circuitBreakerState: connectionState.circuitBreakerState
      }
    };
  }
};

// Graceful degradation wrapper
const executeWithFallback = async (operation, fallback = null, timeout = CONFIG.SOCKET_TIMEOUT) => {
  if (!connectionState.isConnected && circuitBreaker.isOpen()) {
    console.warn('⚠️ Circuit breaker is OPEN, using fallback mechanism');
    if (fallback) {
      return fallback();
    }
    throw new CircuitBreakerError();
  }

  try {
    // Add timeout to the operation
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new DatabaseTimeoutError('database_operation', timeout));
      }, timeout);
    });

    const result = await Promise.race([operation(), timeoutPromise]);
    circuitBreaker.recordSuccess();
    return result;
    
  } catch (error) {
    console.error('❌ Database operation failed:', error.message);
    
    if (error instanceof DatabaseTimeoutError) {
      console.error('⏰ Operation timed out, checking connection health...');
      await checkDatabaseHealth();
    }
    
    circuitBreaker.recordFailure();
    
    if (fallback) {
      console.log('🔄 Using fallback mechanism');
      return fallback();
    }
    
    throw error;
  }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established');
  connectionState.isConnected = true;
  connectionState.healthCheck.status = 'connected';
  circuitBreaker.recordSuccess();
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error.message);
  connectionState.isConnected = false;
  connectionState.lastError = error;
  connectionState.healthCheck.status = 'error';
  circuitBreaker.recordFailure();
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB connection disconnected');
  connectionState.isConnected = false;
  connectionState.healthCheck.status = 'disconnected';
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB connection reconnected');
  connectionState.isConnected = true;
  connectionState.healthCheck.status = 'connected';
  circuitBreaker.recordSuccess();
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('🛑 Initiating graceful shutdown...');
  
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error.message);
    process.exit(1);
  }
};

// Handle process termination signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Export functions and state
module.exports = {
  connectWithRetry,
  checkDatabaseHealth,
  executeWithFallback,
  connectionState,
  circuitBreaker,
  gracefulShutdown,
  CONFIG,
  // Error classes for external use
  DatabaseConnectionError,
  DatabaseTimeoutError,
  CircuitBreakerError
};

// Auto-connect on module load
if (process.env.NODE_ENV !== 'test') {
  connectWithRetry().catch(error => {
    console.error('🚨 Failed to establish initial MongoDB connection:', error.message);
    // Don't exit - let the application handle the error
  });
}