const xss = require("xss");

/**
 * Comprehensive XSS Sanitization Middleware
 * Sanitizes all incoming request data (body, query, params)
 * Handles nested objects and arrays recursively
 */

// XSS configuration for more restrictive sanitization
const xssOptions = {
  whiteList: {
    // Allow only very basic formatting if needed
    b: [],
    i: [],
    em: [],
    strong: [],
    br: [],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script"],
  allowCommentTag: false,
};

/**
 * Recursively sanitize an object or array
 * @param {any} obj - The object/array/value to sanitize
 * @returns {any} - Sanitized object/array/value
 */
function sanitizeRecursive(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return xss(obj, xssOptions);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeRecursive(item));
  }

  if (typeof obj === "object") {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize both key and value
      const sanitizedKey = typeof key === "string" ? xss(key, xssOptions) : key;
      sanitized[sanitizedKey] = sanitizeRecursive(value);
    }
    return sanitized;
  }

  // Return primitive values as-is (numbers, booleans, etc.)
  return obj;
}

/**
 * Express middleware for XSS sanitization
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const xssSanitizer = (req, res, next) => {
  try {
    // Sanitize request body
    if (req.body && typeof req.body === "object") {
      req.body = sanitizeRecursive(req.body);
    }

    // Sanitize query parameters
    if (req.query && typeof req.query === "object") {
      req.query = sanitizeRecursive(req.query);
    }

    // Sanitize URL parameters
    if (req.params && typeof req.params === "object") {
      req.params = sanitizeRecursive(req.params);
    }

    // Sanitize headers that might contain user input
    const headersToSanitize = ["user-agent", "referer", "x-forwarded-for"];
    headersToSanitize.forEach((header) => {
      if (req.headers[header] && typeof req.headers[header] === "string") {
        req.headers[header] = xss(req.headers[header], xssOptions);
      }
    });

    next();
  } catch (error) {
    console.error("XSS Sanitization Error:", error);
    return res.status(400).json({
      error: "Invalid request data",
      message: "Request contains potentially malicious content",
    });
  }
};

module.exports = {
  xssSanitizer,
  sanitizeRecursive,
};
