# MongoDB Connection Management & Error Handling Guide

## 📋 Overview

This guide covers the enhanced MongoDB connection management system implemented in the Civix backend. The system provides robust error handling, connection retry logic, health monitoring, graceful degradation, and circuit breaker patterns.

## 🏗️ Architecture

### Core Components

1. **Enhanced MongoDB Configuration** (`backend/config/mongo.js`)
   - Connection retry logic with exponential backoff
   - Circuit breaker pattern implementation
   - Health check functionality
   - Graceful degradation support
   - Custom error classes

2. **Health Check Endpoints** (`backend/server.js`)
   - `/api/health` - Overall system health
   - `/api/health/db` - Database-specific health
   - `/api/health/detailed` - Detailed system status

3. **Database Utilities** (`backend/utils/databaseUtils.js`)
   - Cached read operations with fallback
   - Write operations with retry and validation
   - Batch operation handling
   - Connection status monitoring

4. **Enhanced Error Handler** (`backend/middlewares/errorHandler.js`)
   - Structured error responses
   - Custom error class handling
   - User-friendly error messages
   - Retry-after headers

## ⚙️ Configuration

### Environment Variables

```bash
# Connection Settings
MONGO_URI=mongodb://localhost:27017/civix
MONGO_RETRY_ATTEMPTS=5
MONGO_INITIAL_DELAY=1000

# Timeout Settings
MONGO_CONNECTION_TIMEOUT=30000
MONGO_SOCKET_TIMEOUT=45000
MONGO_SERVER_SELECTION_TIMEOUT=30000

# Connection Pool Settings
MONGO_MAX_POOL_SIZE=10
MONGO_MIN_POOL_SIZE=2
MONGO_MAX_IDLE_TIME=30000

# Circuit Breaker Settings
MONGO_CIRCUIT_BREAKER_THRESHOLD=5
MONGO_CIRCUIT_BREAKER_TIMEOUT=60000
```

### Default Configuration

```javascript
const CONFIG = {
  RETRY_ATTEMPTS: 5,
  INITIAL_DELAY: 1000,
  CONNECTION_TIMEOUT: 30000,
  SOCKET_TIMEOUT: 45000,
  SERVER_SELECTION_TIMEOUT: 30000,
  MAX_POOL_SIZE: 10,
  MIN_POOL_SIZE: 2,
  MAX_IDLE_TIME: 30000,
  CIRCUIT_BREAKER_THRESHOLD: 5,
  CIRCUIT_BREAKER_TIMEOUT: 60000
};
```

## 🚀 Usage Examples

### Basic Connection

```javascript
const { connectWithRetry, checkDatabaseHealth } = require('./config/mongo.js');

// Auto-connects on module load
// Manual connection if needed
try {
  await connectWithRetry();
  console.log('✅ Connected to MongoDB');
} catch (error) {
  console.error('❌ Connection failed:', error.message);
}
```

### Health Checks

```javascript
// Check overall system health
const health = await fetch('/api/health');
const healthData = await health.json();

// Check database health specifically
const dbHealth = await fetch('/api/health/db');
const dbHealthData = await dbHealth.json();

// Get detailed system status
const detailed = await fetch('/api/health/detailed');
const detailedData = await detailed.json();
```

### Database Operations with Fallback

```javascript
const { 
  readWithCache, 
  writeWithRetry, 
  executeWithFallback,
  isReadOnlyMode 
} = require('./utils/databaseUtils.js');

// Read operation with cache fallback
const user = await readWithCache(
  () => User.findById(userId),
  `user_${userId}`,
  { id: userId, name: 'Default User' } // fallback data
);

// Write operation with retry
const result = await writeWithRetry(
  () => User.create(userData),
  (result) => result && result._id // validation function
);

// Custom operation with fallback
const data = await executeWithFallback(
  async () => {
    // Your database operation
    return await User.find({ status: 'active' });
  },
  () => {
    // Fallback operation
    return [{ id: 1, name: 'Fallback User' }];
  }
);

// Check if in read-only mode
if (isReadOnlyMode()) {
  console.log('⚠️ Database is in read-only mode');
}
```

### Batch Operations

```javascript
const { batchOperation } = require('./utils/databaseUtils.js');

const operations = [
  () => User.create(user1),
  () => User.create(user2),
  () => User.create(user3)
];

const results = await batchOperation(operations, {
  continueOnError: true,
  maxRetries: 3,
  batchSize: 10
});

console.log(`✅ Successful: ${results.successful.length}`);
console.log(`❌ Failed: ${results.failed.length}`);
console.log(`⚠️ Partial: ${results.partial}`);
```

### Circuit Breaker Usage

```javascript
const { circuitBreaker, connectionState } = require('./config/mongo.js');

// Check circuit breaker state
if (circuitBreaker.isOpen()) {
  console.log('🚨 Circuit breaker is OPEN');
}

// Get connection status
const status = {
  isConnected: connectionState.isConnected,
  circuitBreakerState: connectionState.circuitBreakerState,
  retryCount: connectionState.retryCount,
  lastError: connectionState.lastError?.message
};
```

## 🔧 Error Handling

### Custom Error Classes

```javascript
const { 
  DatabaseConnectionError, 
  DatabaseTimeoutError, 
  CircuitBreakerError 
} = require('./config/mongo.js');

// Handle specific error types
try {
  await databaseOperation();
} catch (error) {
  if (error instanceof DatabaseConnectionError) {
    console.log('Connection failed after', error.retryCount, 'attempts');
  } else if (error instanceof DatabaseTimeoutError) {
    console.log('Operation timed out after', error.timeout, 'ms');
  } else if (error instanceof CircuitBreakerError) {
    console.log('Circuit breaker is open');
  }
}
```

### Error Response Format

```javascript
// Example error response
{
  "error": {
    "type": "DatabaseConnectionError",
    "message": "Database connection is currently unavailable",
    "details": {
      "retryCount": 3,
      "cause": "ECONNREFUSED",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    "userMessage": "We are experiencing database connectivity issues. Please try again in a few moments.",
    "retryAfter": 30
  }
}
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints

#### `/api/health`
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "production",
  "memory": {
    "used": 45,
    "total": 64,
    "external": 12
  },
  "database": {
    "status": "connected",
    "message": "Database is healthy",
    "responseTime": 15
  },
  "services": {
    "database": "connected",
    "circuitBreakerState": "CLOSED"
  },
  "responseTime": 25
}
```

#### `/api/health/db`
```json
{
  "status": "connected",
  "message": "Database is healthy",
  "responseTime": 15,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "details": {
    "readyState": 1,
    "host": "localhost",
    "port": 27017,
    "name": "civix",
    "circuitBreakerState": "CLOSED"
  },
  "connectionState": {
    "isConnected": true,
    "isConnecting": false,
    "retryCount": 0,
    "circuitBreakerState": "CLOSED",
    "lastError": null
  }
}
```

### Monitoring Integration

```javascript
// Custom monitoring integration
const { connectionState, circuitBreaker } = require('./config/mongo.js');

// Send metrics to monitoring service
const metrics = {
  connectionStatus: connectionState.isConnected ? 1 : 0,
  circuitBreakerState: connectionState.circuitBreakerState,
  retryCount: connectionState.retryCount,
  lastError: connectionState.lastError?.message,
  timestamp: new Date().toISOString()
};

// Example: Send to Prometheus, DataDog, etc.
monitoringService.sendMetrics(metrics);
```

## 🧪 Testing

### Running Tests

```bash
# Run all MongoDB connection tests
npm test -- mongoConnection.test.js

# Run specific test suite
npm test -- --grep "Circuit Breaker"

# Run with coverage
npm test -- --coverage mongoConnection.test.js
```

### Test Coverage

The test suite covers:
- ✅ Configuration management
- ✅ Connection state tracking
- ✅ Circuit breaker functionality
- ✅ Error class creation
- ✅ Health check responses
- ✅ Cache management
- ✅ Database utilities
- ✅ Graceful degradation
- ✅ Batch operations
- ✅ Integration scenarios

## 🔍 Troubleshooting

### Common Issues

#### 1. Connection Timeouts

**Symptoms:**
- `DatabaseTimeoutError` errors
- Slow response times
- Connection hanging

**Solutions:**
```javascript
// Increase timeout values
process.env.MONGO_CONNECTION_TIMEOUT = '60000';
process.env.MONGO_SOCKET_TIMEOUT = '90000';

// Check network connectivity
const health = await checkDatabaseHealth();
console.log('Database health:', health);
```

#### 2. Circuit Breaker Opening

**Symptoms:**
- `CircuitBreakerError` errors
- Service degradation
- Repeated connection failures

**Solutions:**
```javascript
// Check circuit breaker state
console.log('Circuit breaker state:', connectionState.circuitBreakerState);

// Wait for automatic recovery
setTimeout(async () => {
  const health = await checkDatabaseHealth();
  console.log('Recovery status:', health);
}, CONFIG.CIRCUIT_BREAKER_TIMEOUT);
```

#### 3. Cache Issues

**Symptoms:**
- Stale data
- Memory usage spikes
- Inconsistent responses

**Solutions:**
```javascript
// Clear cache
cacheManager.clear();

// Check cache stats
const stats = cacheManager.getStats();
console.log('Cache stats:', stats);

// Adjust TTL
cacheManager.set('key', data, 300000); // 5 minutes
```

### Debug Mode

Enable debug logging:

```javascript
// Set debug environment variable
process.env.DEBUG = 'mongodb:*';

// Or enable specific debug categories
process.env.DEBUG = 'mongodb:connection,mongodb:retry';
```

### Performance Monitoring

```javascript
// Monitor connection performance
const startTime = Date.now();
await connectWithRetry();
const connectionTime = Date.now() - startTime;

console.log(`Connection time: ${connectionTime}ms`);

// Monitor operation performance
const operationStart = Date.now();
const result = await executeWithFallback(operation);
const operationTime = Date.now() - operationStart;

console.log(`Operation time: ${operationTime}ms`);
```

## 🔄 Migration Guide

### From Basic MongoDB Connection

**Before:**
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.error(err));
```

**After:**
```javascript
const { connectWithRetry, checkDatabaseHealth } = require('./config/mongo.js');

// Auto-connects with retry logic
// Manual health checks available
const health = await checkDatabaseHealth();
```

### From Basic Error Handling

**Before:**
```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

**After:**
```javascript
// Enhanced error handler automatically handles:
// - Custom error classes
// - Structured responses
// - User-friendly messages
// - Retry-after headers
```

## 📈 Performance Optimization

### Connection Pool Tuning

```javascript
// For high-traffic applications
process.env.MONGO_MAX_POOL_SIZE = '20';
process.env.MONGO_MIN_POOL_SIZE = '5';

// For low-traffic applications
process.env.MONGO_MAX_POOL_SIZE = '5';
process.env.MONGO_MIN_POOL_SIZE = '1';
```

### Cache Optimization

```javascript
// Adjust cache TTL based on data volatility
const CACHE_TTL = {
  USER_PROFILE: 10 * 60 * 1000,    // 10 minutes
  ISSUE_LIST: 5 * 60 * 1000,       // 5 minutes
  STATIC_DATA: 60 * 60 * 1000      // 1 hour
};

cacheManager.set('user_profile', data, CACHE_TTL.USER_PROFILE);
```

### Retry Strategy Tuning

```javascript
// For unstable networks
process.env.MONGO_RETRY_ATTEMPTS = '10';
process.env.MONGO_INITIAL_DELAY = '500';

// For stable networks
process.env.MONGO_RETRY_ATTEMPTS = '3';
process.env.MONGO_INITIAL_DELAY = '2000';
```

## 🔐 Security Considerations

### Connection Security

```javascript
// Use SSL/TLS for production
const mongoOptions = {
  ssl: true,
  sslValidate: true,
  sslCA: fs.readFileSync('/path/to/ca.pem'),
  authSource: 'admin'
};
```

### Error Information Disclosure

```javascript
// In production, limit error details
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // Don't expose internal error details
  errorResponse.details = undefined;
}
```

## 📚 Additional Resources

- [MongoDB Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [Mongoose Connection Options](https://mongoosejs.com/docs/connections.html)
- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Health Check Best Practices](https://microservices.io/patterns/observability/health-check-api.html)

---

*This guide covers the complete MongoDB connection management implementation. For additional support, refer to the test files and error logs.*
