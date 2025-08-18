const csrf = require("csurf");

/**
 * CSRF Protection Configuration
 * Provides protection against Cross-Site Request Forgery attacks
 */

// CSRF protection configuration
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  },
  // Ignore GET requests and some safe endpoints
  ignoreMethods: ["GET", "HEAD", "OPTIONS"],
  // Custom error handling
  value: (req) => {
    // Check for CSRF token in headers or body
    return (
      req.headers["x-csrf-token"] ||
      req.headers["csrf-token"] ||
      req.body._csrf ||
      req.query._csrf
    );
  },
});

/**
 * Middleware to skip CSRF for specific routes
 * @param {Array} skipRoutes - Array of route patterns to skip
 */
const skipCSRFForRoutes = (skipRoutes = []) => {
  return (req, res, next) => {
    // Skip CSRF for certain routes (like webhooks, public APIs)
    const shouldSkip = skipRoutes.some((route) => {
      if (typeof route === "string") {
        return req.path.startsWith(route);
      }
      if (route instanceof RegExp) {
        return route.test(req.path);
      }
      return false;
    });

    if (shouldSkip) {
      return next();
    }

    // Apply CSRF protection
    csrfProtection(req, res, next);
  };
};

/**
 * Error handler for CSRF errors
 */
const csrfErrorHandler = (err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({
      error: "Invalid CSRF token",
      message:
        "Your session has expired or the request is invalid. Please refresh the page and try again.",
      code: "CSRF_TOKEN_INVALID",
    });
  }
  next(err);
};

module.exports = {
  csrfProtection,
  skipCSRFForRoutes,
  csrfErrorHandler,
};
