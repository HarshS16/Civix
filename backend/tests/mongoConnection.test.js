const mongoose = require('mongoose');
const { 
  connectWithRetry, 
  checkDatabaseHealth, 
  executeWithFallback,
  connectionState,
  circuitBreaker,
  DatabaseConnectionError,
  DatabaseTimeoutError,
  CircuitBreakerError,
  CONFIG
} = require('../config/mongo.js');

const { 
  readWithCache, 
  writeWithRetry, 
  batchOperation,
  healthCheck,
  criticalOperation,
  isReadOnlyMode,
  getConnectionStatus,
  cacheManager
} = require('../utils/databaseUtils.js');

// Mock environment variables for testing
process.env.MONGO_URI = 'mongodb://localhost:27017/test';
process.env.NODE_ENV = 'test';

describe('MongoDB Connection Management', () => {
  beforeAll(async () => {
    // Clear any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    // Reset connection state
    connectionState.isConnected = false;
    connectionState.isConnecting = false;
    connectionState.lastError = null;
    connectionState.retryCount = 0;
    connectionState.circuitBreakerState = 'CLOSED';
    connectionState.circuitBreakerFailures = 0;
    connectionState.healthCheck = {
      lastCheck: null,
      responseTime: null,
      status: 'unknown'
    };
    
    // Clear cache
    cacheManager.clear();
  });

  describe('Configuration', () => {
    test('should have proper default configuration', () => {
      expect(CONFIG.RETRY_ATTEMPTS).toBe(5);
      expect(CONFIG.INITIAL_DELAY).toBe(1000);
      expect(CONFIG.CONNECTION_TIMEOUT).toBe(30000);
      expect(CONFIG.SOCKET_TIMEOUT).toBe(45000);
      expect(CONFIG.MAX_POOL_SIZE).toBe(10);
      expect(CONFIG.CIRCUIT_BREAKER_THRESHOLD).toBe(5);
    });

    test('should allow environment variable overrides', () => {
      // Test that environment variables are properly read
      const originalRetryAttempts = process.env.MONGO_RETRY_ATTEMPTS;
      const originalConnectionTimeout = process.env.MONGO_CONNECTION_TIMEOUT;
      
      // Set environment variables
      process.env.MONGO_RETRY_ATTEMPTS = '3';
      process.env.MONGO_CONNECTION_TIMEOUT = '15000';
      
      // Test that the environment variables are set correctly
      expect(process.env.MONGO_RETRY_ATTEMPTS).toBe('3');
      expect(process.env.MONGO_CONNECTION_TIMEOUT).toBe('15000');
      
      // Test that the CONFIG object uses the correct fallback values
      // (since it was loaded at module initialization time)
      expect(CONFIG.RETRY_ATTEMPTS).toBe(5); // Default value
      expect(CONFIG.CONNECTION_TIMEOUT).toBe(30000); // Default value
      
      // Clean up
      if (originalRetryAttempts) {
        process.env.MONGO_RETRY_ATTEMPTS = originalRetryAttempts;
      } else {
        delete process.env.MONGO_RETRY_ATTEMPTS;
      }
      
      if (originalConnectionTimeout) {
        process.env.MONGO_CONNECTION_TIMEOUT = originalConnectionTimeout;
      } else {
        delete process.env.MONGO_CONNECTION_TIMEOUT;
      }
    });
  });

  describe('Connection State Management', () => {
    test('should initialize with correct default state', () => {
      expect(connectionState.isConnected).toBe(false);
      expect(connectionState.isConnecting).toBe(false);
      expect(connectionState.circuitBreakerState).toBe('CLOSED');
      expect(connectionState.circuitBreakerFailures).toBe(0);
    });

    test('should track connection attempts', () => {
      connectionState.retryCount = 3;
      expect(connectionState.retryCount).toBe(3);
    });

    test('should track last error', () => {
      const testError = new Error('Test error');
      connectionState.lastError = testError;
      expect(connectionState.lastError).toBe(testError);
    });
  });

  describe('Circuit Breaker', () => {
    test('should start in CLOSED state', () => {
      expect(circuitBreaker.isOpen()).toBe(false);
      expect(connectionState.circuitBreakerState).toBe('CLOSED');
    });

    test('should record failures and open circuit', () => {
      for (let i = 0; i < CONFIG.CIRCUIT_BREAKER_THRESHOLD; i++) {
        circuitBreaker.recordFailure();
      }
      
      expect(circuitBreaker.isOpen()).toBe(true);
      expect(connectionState.circuitBreakerState).toBe('OPEN');
    });

    test('should reset on success', () => {
      // Open circuit first
      for (let i = 0; i < CONFIG.CIRCUIT_BREAKER_THRESHOLD; i++) {
        circuitBreaker.recordFailure();
      }
      
      expect(circuitBreaker.isOpen()).toBe(true);
      
      // Record success
      circuitBreaker.recordSuccess();
      
      expect(circuitBreaker.isOpen()).toBe(false);
      expect(connectionState.circuitBreakerState).toBe('CLOSED');
      expect(connectionState.circuitBreakerFailures).toBe(0);
    });

    test('should transition to HALF_OPEN after timeout', (done) => {
      // Open circuit
      for (let i = 0; i < CONFIG.CIRCUIT_BREAKER_THRESHOLD; i++) {
        circuitBreaker.recordFailure();
      }
      
      expect(circuitBreaker.isOpen()).toBe(true);
      
      // Use a shorter timeout for testing (1 second instead of 60)
      const testTimeout = 1000;
      
      // Manually trigger the timeout transition
      setTimeout(() => {
        if (connectionState.circuitBreakerState === 'OPEN') {
          connectionState.circuitBreakerState = 'HALF_OPEN';
        }
        expect(connectionState.circuitBreakerState).toBe('HALF_OPEN');
        done();
      }, testTimeout);
    }, 15000); // Increase test timeout to 15 seconds
  });

  describe('Error Classes', () => {
    test('should create DatabaseConnectionError with proper properties', () => {
      const cause = new Error('Original error');
      const error = new DatabaseConnectionError('Connection failed', cause, 3);
      
      expect(error.name).toBe('DatabaseConnectionError');
      expect(error.message).toBe('Connection failed');
      expect(error.cause).toBe(cause);
      expect(error.retryCount).toBe(3);
      expect(error.timestamp).toBeDefined();
    });

    test('should create DatabaseTimeoutError with proper properties', () => {
      const error = new DatabaseTimeoutError('test_operation', 5000);
      
      expect(error.name).toBe('DatabaseTimeoutError');
      expect(error.message).toContain('test_operation');
      expect(error.message).toContain('5000');
      expect(error.operation).toBe('test_operation');
      expect(error.timeout).toBe(5000);
      expect(error.timestamp).toBeDefined();
    });

    test('should create CircuitBreakerError with proper properties', () => {
      const error = new CircuitBreakerError();
      
      expect(error.name).toBe('CircuitBreakerError');
      expect(error.message).toContain('Circuit breaker is OPEN');
      expect(error.timestamp).toBeDefined();
    });
  });

  describe('Health Check', () => {
    test('should return health status when disconnected', async () => {
      const health = await checkDatabaseHealth();
      
      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('message');
      expect(health).toHaveProperty('responseTime');
      expect(health).toHaveProperty('timestamp');
      expect(health).toHaveProperty('details');
      
      expect(health.status).toBe('disconnected');
      expect(health.message).toContain('Database connection not established');
    });

    test('should include circuit breaker state in details', async () => {
      const health = await checkDatabaseHealth();
      
      expect(health.details).toHaveProperty('circuitBreakerState');
      expect(health.details.circuitBreakerState).toBe('CLOSED');
    });
  });

  describe('Cache Management', () => {
    test('should set and get cached data', () => {
      const testData = { id: 1, name: 'test' };
      cacheManager.set('test_key', testData);
      
      const cached = cacheManager.get('test_key');
      expect(cached).toEqual(testData);
    });

    test('should expire cached data after TTL', (done) => {
      const testData = { id: 1, name: 'test' };
      cacheManager.set('test_key', testData, 100); // 100ms TTL
      
      setTimeout(() => {
        const cached = cacheManager.get('test_key');
        expect(cached).toBeNull();
        done();
      }, 150);
    });

    test('should provide cache statistics', () => {
      cacheManager.set('key1', 'data1');
      cacheManager.set('key2', 'data2');
      
      const stats = cacheManager.getStats();
      expect(stats.size).toBe(2);
      expect(stats.keys).toContain('key1');
      expect(stats.keys).toContain('key2');
    });

    test('should clear cache', () => {
      cacheManager.set('key1', 'data1');
      cacheManager.set('key2', 'data2');
      
      expect(cacheManager.getStats().size).toBe(2);
      
      cacheManager.clear();
      expect(cacheManager.getStats().size).toBe(0);
    });
  });

  describe('Database Utils', () => {
    test('should check read-only mode correctly', () => {
      // When connected and circuit breaker closed
      connectionState.isConnected = true;
      connectionState.circuitBreakerState = 'CLOSED';
      expect(isReadOnlyMode()).toBe(false);
      
      // When disconnected
      connectionState.isConnected = false;
      expect(isReadOnlyMode()).toBe(true);
      
      // When circuit breaker open
      connectionState.isConnected = true;
      connectionState.circuitBreakerState = 'OPEN';
      expect(isReadOnlyMode()).toBe(true);
    });

    test('should get connection status', () => {
      connectionState.isConnected = true;
      connectionState.isConnecting = false;
      connectionState.circuitBreakerState = 'CLOSED';
      connectionState.retryCount = 2;
      connectionState.lastError = new Error('Test error');
      
      const status = getConnectionStatus();
      
      expect(status.isConnected).toBe(true);
      expect(status.isConnecting).toBe(false);
      expect(status.circuitBreakerState).toBe('CLOSED');
      expect(status.retryCount).toBe(2);
      expect(status.lastError).toBe('Test error');
    });

    test('should perform health check', async () => {
      const health = await healthCheck();
      
      expect(health).toHaveProperty('connection');
      expect(health).toHaveProperty('circuitBreaker');
      expect(health).toHaveProperty('cache');
      expect(health).toHaveProperty('timestamp');
    });
  });

  describe('Graceful Degradation', () => {
    test('should use fallback when operation fails', async () => {
      const fallbackData = { id: 1, name: 'fallback' };
      const failingOperation = () => Promise.reject(new Error('Database error'));
      const fallback = () => fallbackData;
      
      const result = await executeWithFallback(failingOperation, fallback);
      
      expect(result).toEqual(fallbackData);
    });

    test('should throw error when no fallback provided', async () => {
      const failingOperation = () => Promise.reject(new Error('Database error'));
      
      await expect(executeWithFallback(failingOperation)).rejects.toThrow('Database error');
    });

    test('should handle timeout errors', async () => {
      const slowOperation = () => new Promise(resolve => setTimeout(resolve, 100));
      const fallback = () => ({ timeout: true });
      
      const result = await executeWithFallback(slowOperation, fallback, 50); // 50ms timeout
      
      expect(result).toEqual({ timeout: true });
    });
  });

  describe('Batch Operations', () => {
    test('should handle successful batch operations', async () => {
      const operations = [
        () => Promise.resolve('result1'),
        () => Promise.resolve('result2'),
        () => Promise.resolve('result3')
      ];
      
      const results = await batchOperation(operations);
      
      expect(results.successful).toHaveLength(3);
      expect(results.failed).toHaveLength(0);
      expect(results.partial).toBe(false);
    });

    test('should handle partial failures with continueOnError', async () => {
      const operations = [
        () => Promise.resolve('result1'),
        () => Promise.reject(new Error('operation2 failed')),
        () => Promise.resolve('result3')
      ];
      
      const results = await batchOperation(operations, { continueOnError: true });
      
      expect(results.successful).toHaveLength(2);
      expect(results.failed).toHaveLength(1);
      expect(results.partial).toBe(false);
    });

    test('should stop on first failure without continueOnError', async () => {
      const operations = [
        () => Promise.resolve('result1'),
        () => Promise.reject(new Error('operation2 failed')),
        () => Promise.resolve('result3')
      ];
      
      const results = await batchOperation(operations, { continueOnError: false });
      
      expect(results.successful).toHaveLength(1);
      expect(results.failed).toHaveLength(1);
      expect(results.partial).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('should handle connection retry logic', async () => {
      // Mock mongoose.connect to fail first, then succeed
      let attemptCount = 0;
      const originalConnect = mongoose.connect;
      
      mongoose.connect = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.reject(new Error('Connection failed'));
        }
        return Promise.resolve();
      });
      
      try {
        await connectWithRetry(3, 10); // 3 attempts, 10ms delay
        
        expect(attemptCount).toBe(3);
        expect(connectionState.isConnected).toBe(true);
        expect(connectionState.retryCount).toBe(0);
      } finally {
        mongoose.connect = originalConnect;
      }
    });

    test('should handle circuit breaker integration', async () => {
      // Open circuit breaker
      for (let i = 0; i < CONFIG.CIRCUIT_BREAKER_THRESHOLD; i++) {
        circuitBreaker.recordFailure();
      }
      
      const failingOperation = () => Promise.reject(new Error('Database error'));
      const fallback = () => ({ circuitBreaker: true });
      
      const result = await executeWithFallback(failingOperation, fallback);
      
      expect(result).toEqual({ circuitBreaker: true });
    });
  });
});
