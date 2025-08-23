const { DatabaseConnectionError, DatabaseTimeoutError, CircuitBreakerError } = require('../config/mongo.js');

// Enhanced error handler with structured responses
module.exports = (err, req, res, next) => {
  // Log the error with context
  console.error('🚨 Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Handle custom database errors
  if (err instanceof DatabaseConnectionError) {
    return res.status(503).json({
      error: {
        type: 'DatabaseConnectionError',
        message: 'Database connection is currently unavailable',
        details: {
          retryCount: err.retryCount,
          cause: err.cause?.message,
          timestamp: err.timestamp
        },
        userMessage: 'We are experiencing database connectivity issues. Please try again in a few moments.',
        retryAfter: 30 // seconds
      }
    });
  }

  if (err instanceof DatabaseTimeoutError) {
    return res.status(408).json({
      error: {
        type: 'DatabaseTimeoutError',
        message: 'Database operation timed out',
        details: {
          operation: err.operation,
          timeout: err.timeout,
          timestamp: err.timestamp
        },
        userMessage: 'The database operation took too long to complete. Please try again.',
        retryAfter: 10 // seconds
      }
    });
  }

  if (err instanceof CircuitBreakerError) {
    return res.status(503).json({
      error: {
        type: 'CircuitBreakerError',
        message: 'Service temporarily unavailable due to repeated failures',
        details: {
          timestamp: err.timestamp
        },
        userMessage: 'Our service is temporarily unavailable due to technical difficulties. Please try again later.',
        retryAfter: 60 // seconds
      }
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        type: 'ValidationError',
        message: 'Data validation failed',
        details: {
          field: err.path,
          value: err.value,
          reason: err.reason?.message || err.message
        },
        userMessage: 'The provided data is invalid. Please check your input and try again.'
      }
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      error: {
        type: 'DuplicateKeyError',
        message: 'Duplicate key violation',
        details: {
          field: field,
          value: err.keyValue[field]
        },
        userMessage: `A record with this ${field} already exists. Please use a different value.`
      }
    });
  }

  // Handle MongoDB cast errors (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: {
        type: 'CastError',
        message: 'Invalid data format',
        details: {
          field: err.path,
          value: err.value,
          expectedType: err.kind
        },
        userMessage: 'The provided data format is invalid. Please check your input.'
      }
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        type: 'AuthenticationError',
        message: 'Invalid authentication token',
        details: {
          reason: err.message
        },
        userMessage: 'Your session has expired. Please log in again.'
      }
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: {
        type: 'AuthenticationError',
        message: 'Authentication token expired',
        details: {
          expiredAt: err.expiredAt
        },
        userMessage: 'Your session has expired. Please log in again.'
      }
    });
  }

  // Handle CSRF errors
  if (err.code === 'CSRF_TOKEN_INVALID') {
    return res.status(403).json({
      error: {
        type: 'CSRFError',
        message: 'CSRF token validation failed',
        details: {
          reason: 'Invalid or missing CSRF token'
        },
        userMessage: 'Security validation failed. Please refresh the page and try again.'
      }
    });
  }

  // Handle rate limiting errors
  if (err.status === 429) {
    return res.status(429).json({
      error: {
        type: 'RateLimitError',
        message: 'Too many requests',
        details: {
          retryAfter: err.headers?.['retry-after'] || 60
        },
        userMessage: 'You have made too many requests. Please wait a moment before trying again.'
      }
    });
  }

  // Handle file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: {
        type: 'FileUploadError',
        message: 'File too large',
        details: {
          maxSize: err.limit,
          actualSize: err.size
        },
        userMessage: 'The uploaded file is too large. Please choose a smaller file.'
      }
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: {
        type: 'FileUploadError',
        message: 'Unexpected file field',
        details: {
          field: err.field
        },
        userMessage: 'Invalid file upload. Please check your form and try again.'
      }
    });
  }

  // Handle network and connection errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({
      error: {
        type: 'ConnectionError',
        message: 'External service unavailable',
        details: {
          code: err.code,
          host: err.hostname || err.host
        },
        userMessage: 'We are unable to connect to external services. Please try again later.'
      }
    });
  }

  // Handle timeout errors
  if (err.code === 'ETIMEDOUT') {
    return res.status(408).json({
      error: {
        type: 'TimeoutError',
        message: 'Request timeout',
        details: {
          code: err.code
        },
        userMessage: 'The request took too long to complete. Please try again.'
      }
    });
  }

  // Default error response for unknown errors
  const status = err.status || err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorResponse = {
    error: {
      type: 'InternalServerError',
      message: isDevelopment ? err.message : 'An unexpected error occurred',
      ...(isDevelopment && {
        details: {
          stack: err.stack,
          name: err.name,
          code: err.code
        }
      }),
      userMessage: 'Something went wrong on our end. Please try again later.',
      timestamp: new Date().toISOString(),
      requestId: req.id || Math.random().toString(36).substr(2, 9)
    }
  };

  // Add retry information for certain errors
  if (status >= 500 && status < 600) {
    errorResponse.error.retryAfter = 30;
  }

  res.status(status).json(errorResponse);
};