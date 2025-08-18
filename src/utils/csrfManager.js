/**
 * CSRF Token Management Utility
 * Handles CSRF token fetching and inclusion in requests
 */

class CSRFManager {
  constructor() {
    this.token = null;
    this.tokenPromise = null;
  }

  /**
   * Fetch CSRF token from server
   * @returns {Promise<string>} CSRF token
   */
  async fetchToken() {
    try {
      const response = await fetch("/api/csrf-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const data = await response.json();
      this.token = data.csrfToken;
      return this.token;
    } catch (error) {
      console.error("CSRF token fetch error:", error);
      throw error;
    }
  }

  /**
   * Get CSRF token (fetch if not available)
   * @returns {Promise<string>} CSRF token
   */
  async getToken() {
    if (this.token) {
      return this.token;
    }

    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    this.tokenPromise = this.fetchToken();
    try {
      await this.tokenPromise;
      return this.token;
    } finally {
      this.tokenPromise = null;
    }
  }

  /**
   * Clear stored token (e.g., on logout or token expiry)
   */
  clearToken() {
    this.token = null;
    this.tokenPromise = null;
  }

  /**
   * Create headers object with CSRF token
   * @param {Object} additionalHeaders - Additional headers to include
   * @returns {Promise<Object>} Headers object with CSRF token
   */
  async createHeaders(additionalHeaders = {}) {
    const token = await this.getToken();
    return {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
      ...additionalHeaders,
    };
  }

  /**
   * Enhanced fetch with automatic CSRF token inclusion
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise<Response>} Fetch response
   */
  async secureFetch(url, options = {}) {
    const method = options.method || "GET";
    const needsCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(
      method.toUpperCase()
    );

    if (needsCSRF) {
      try {
        const token = await this.getToken();

        // Handle FormData differently
        if (options.body instanceof FormData) {
          // Add CSRF token to FormData
          options.body.append("_csrf", token);

          // Ensure headers don't override Content-Type for FormData
          options.headers = {
            "X-CSRF-Token": token,
            ...(options.headers || {}),
          };
          // Remove Content-Type if it exists to let browser set boundary
          delete options.headers["Content-Type"];
        } else {
          // Regular JSON requests
          const headers = await this.createHeaders(options.headers);
          options.headers = headers;
        }
      } catch (error) {
        console.warn("Failed to get CSRF token, proceeding without it:", error);
      }
    }

    options.credentials = options.credentials || "include";

    const response = await fetch(url, options);

    // If CSRF token is invalid, clear it and retry once
    if (response.status === 403 && needsCSRF) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === "CSRF_TOKEN_INVALID") {
        this.clearToken();

        // Retry once with new token
        try {
          const newToken = await this.getToken();

          if (options.body instanceof FormData) {
            // Remove old CSRF token and add new one
            options.body.delete("_csrf");
            options.body.append("_csrf", newToken);
            options.headers["X-CSRF-Token"] = newToken;
          } else {
            const newHeaders = await this.createHeaders(options.headers);
            options.headers = newHeaders;
          }

          const retryResponse = await fetch(url, options);
          return retryResponse;
        } catch (retryError) {
          console.error("CSRF retry failed:", retryError);
          return response; // Return original response
        }
      }
    }

    return response;
  }
}

// Create singleton instance
const csrfManager = new CSRFManager();

// Export both the class and singleton for flexibility
export { CSRFManager, csrfManager };
export default csrfManager;
