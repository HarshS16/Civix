const { executeWithFallback, connectionState, circuitBreaker } = require('../config/mongo.js');

// Cache for fallback data
const fallbackCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache management utilities
const cacheManager = {
  set(key, data, ttl = CACHE_TTL) {
    fallbackCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  },

  get(key) {
    const cached = fallbackCache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      fallbackCache.delete(key);
      return null;
    }
    
    return cached.data;
  },

  clear() {
    fallbackCache.clear();
  },

  getStats() {
    return {
      size: fallbackCache.size,
      keys: Array.from(fallbackCache.keys())
    };
  }
};

// Database operation wrappers with fallback mechanisms
const databaseUtils = {
  // Read operation with cache fallback
  async readWithCache(operation, cacheKey, fallbackData = null) {
    const fallback = () => {
      const cached = cacheManager.get(cacheKey);
      if (cached) {
        console.log(`📦 Using cached data for: ${cacheKey}`);
        return cached;
      }
      
      if (fallbackData) {
        console.log(`🔄 Using fallback data for: ${cacheKey}`);
        return fallbackData;
      }
      
      throw new Error('No cached or fallback data available');
    };

    try {
      const result = await executeWithFallback(operation);
      
      // Cache successful results for future fallback
      if (result && cacheKey) {
        cacheManager.set(cacheKey, result);
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Database read operation failed for ${cacheKey}:`, error.message);
      return fallback();
    }
  },

  // Write operation with retry and validation
  async writeWithRetry(operation, validationFn = null) {
    const fallback = () => {
      console.log('⚠️ Write operation failed, no fallback available');
      throw new Error('Write operation failed and no fallback is available');
    };

    try {
      const result = await executeWithFallback(operation);
      
      // Validate result if validation function provided
      if (validationFn && !validationFn(result)) {
        throw new Error('Write operation validation failed');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Database write operation failed:', error.message);
      return fallback();
    }
  },

  // Batch operation with partial success handling
  async batchOperation(operations, options = {}) {
    const { 
      continueOnError = false, 
      maxRetries = 3,
      batchSize = 10 
    } = options;

    const results = {
      successful: [],
      failed: [],
      partial: false
    };

    // Process operations in batches
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      
      for (const operation of batch) {
        try {
          const result = await executeWithFallback(operation);
          results.successful.push(result);
        } catch (error) {
          console.error('❌ Batch operation failed:', error.message);
          results.failed.push({
            operation: operation.name || 'unknown',
            error: error.message
          });
          
          if (!continueOnError) {
            results.partial = true;
            break;
          }
        }
      }
      
      if (results.partial && !continueOnError) {
        break;
      }
    }

    return results;
  },

  // Health check wrapper
  async healthCheck() {
    return {
      connection: connectionState.isConnected,
      circuitBreaker: connectionState.circuitBreakerState,
      cache: cacheManager.getStats(),
      timestamp: new Date().toISOString()
    };
  },

  // Graceful degradation for critical operations
  async criticalOperation(operation, criticalFallback = null) {
    if (!connectionState.isConnected && circuitBreaker.isOpen()) {
      console.warn('🚨 Critical operation attempted with circuit breaker OPEN');
      
      if (criticalFallback) {
        console.log('🔄 Using critical fallback mechanism');
        return criticalFallback();
      }
      
      throw new Error('Critical operation unavailable due to database issues');
    }

    return executeWithFallback(operation, criticalFallback);
  },

  // Read-only mode check
  isReadOnlyMode() {
    return !connectionState.isConnected || circuitBreaker.isOpen();
  },

  // Connection status
  getConnectionStatus() {
    return {
      isConnected: connectionState.isConnected,
      isConnecting: connectionState.isConnecting,
      circuitBreakerState: connectionState.circuitBreakerState,
      lastError: connectionState.lastError?.message,
      retryCount: connectionState.retryCount
    };
  },

  // Cache management
  cache: cacheManager
};

// Specific operation helpers
const operationHelpers = {
  // User operations
  async findUserById(id, fallbackData = null) {
    return databaseUtils.readWithCache(
      () => require('../models/userModel').findById(id),
      `user_${id}`,
      fallbackData
    );
  },

  async findUserByEmail(email, fallbackData = null) {
    return databaseUtils.readWithCache(
      () => require('../models/userModel').findOne({ email }),
      `user_email_${email}`,
      fallbackData
    );
  },

  // Issue operations
  async findIssueById(id, fallbackData = null) {
    return databaseUtils.readWithCache(
      () => require('../models/issues').findById(id),
      `issue_${id}`,
      fallbackData
    );
  },

  async findIssuesByStatus(status, fallbackData = []) {
    return databaseUtils.readWithCache(
      () => require('../models/issues').find({ status }).sort({ createdAt: -1 }),
      `issues_status_${status}`,
      fallbackData
    );
  },

  // Profile operations
  async findProfileByClerkId(clerkId, fallbackData = null) {
    return databaseUtils.readWithCache(
      () => require('../models/userModel').findByClerkId(clerkId),
      `profile_clerk_${clerkId}`,
      fallbackData
    );
  },

  // Write operations with validation
  async createUser(userData) {
    return databaseUtils.writeWithRetry(
      () => require('../models/userModel').create(userData),
      (result) => result && result._id
    );
  },

  async updateUser(id, updateData) {
    return databaseUtils.writeWithRetry(
      () => require('../models/userModel').findByIdAndUpdate(id, updateData, { new: true }),
      (result) => result && result._id
    );
  },

  async createIssue(issueData) {
    return databaseUtils.writeWithRetry(
      () => require('../models/issues').create(issueData),
      (result) => result && result._id
    );
  },

  async updateIssueStatus(id, status) {
    return databaseUtils.writeWithRetry(
      () => require('../models/issues').findByIdAndUpdate(id, { status }, { new: true }),
      (result) => result && result.status === status
    );
  }
};

// Export utilities
module.exports = {
  ...databaseUtils,
  ...operationHelpers,
  // Export cache manager for external use
  cacheManager
};
