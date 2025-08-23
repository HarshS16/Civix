const cluster = require("cluster");
const os = require("os");
const process = require("process");

const numCPUs = os.cpus().length;
if (cluster.isPrimary) {
  console.log(`======================================`);
  console.log(`Civix Backend Primary Process Started`);
  console.log(`Primary PID:${process.pid}`);
  console.log(`=======================================`);
  console.log(`Forking server for ${numCPUs} CPU Cores...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Worker ${worker.process.pid} died. Code: ${code}, Signal: ${signal}`
    );
    if (worker.exitedAfterDisconnect === true) {
      console.log(
        `Worker ${worker.process.pid} exited shutting down gracefully.`
      );
    } else {
      console.log(
        `Worker ${worker.process.pid} exited unexpectedly. Restarting...`
      );
      cluster.fork();
    }
  });
} else {
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  const cookieParser = require("cookie-parser");
  const rateLimit = require("express-rate-limit");
  const path = require("path");
  require("dotenv").config();

  // Security middlewares
  const { xssSanitizer } = require("./middlewares/xssSanitizer");
  const {
    skipCSRFForRoutes,
    csrfErrorHandler,
  } = require("./middlewares/csrfProtection");

  const app = express();

  // === Database Initialization ===

  // Commented db.js import so that the app can run on MongoDB only to rectify the issue of multiple database connections

  // require("./config/db.js");     // PostgreSQL
  const { 
    connectWithRetry, 
    checkDatabaseHealth, 
    executeWithFallback,
    connectionState,
    gracefulShutdown 
  } = require("./config/mongo.js"); // Enhanced MongoDB

  // === Swagger Docs ===
  const { swaggerUi, specs } = require("./config/swagger.js");

  // === Middlewares ===
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://civix-phi.vercel.app/login",
        "https://civix-phi.vercel.app/signup",
      ],
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // === Security Middlewares ===
  // Global XSS Sanitization
  app.use(xssSanitizer);

  // CSRF Protection (skip for certain routes)
  const csrfSkipRoutes = [
    "/api/contributors", // Public read-only API
    "/api-docs", // Swagger documentation
    "/api/auth/webhook", // Potential webhooks (if any)
    "/api/health", // Health check endpoints
    "/api/health/db", // Database health check
  ];
  app.use(skipCSRFForRoutes(csrfSkipRoutes));

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // === Rate Limiting ===
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  });
  app.use(limiter);

  // === Health Check Endpoints ===
  
  // Overall system health check
  app.get("/api/health", async (req, res) => {
    try {
      const startTime = Date.now();
      
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          external: Math.round(process.memoryUsage().external / 1024 / 1024)
        },
        database: await checkDatabaseHealth(),
        services: {
          database: connectionState.isConnected ? 'connected' : 'disconnected',
          circuitBreakerState: connectionState.circuitBreakerState
        }
      };
      
      const responseTime = Date.now() - startTime;
      health.responseTime = responseTime;
      
      // Determine overall health status
      const isHealthy = health.database.status === 'connected' && 
                       health.services.database === 'connected';
      
      health.status = isHealthy ? 'healthy' : 'degraded';
      
      res.status(isHealthy ? 200 : 503).json(health);
      
    } catch (error) {
      console.error('Health check error:', error);
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        uptime: process.uptime()
      });
    }
  });

  // Database-specific health check
  app.get("/api/health/db", async (req, res) => {
    try {
      const dbHealth = await checkDatabaseHealth();
      const statusCode = dbHealth.status === 'connected' ? 200 : 503;
      
      res.status(statusCode).json({
        ...dbHealth,
        connectionState: {
          isConnected: connectionState.isConnected,
          isConnecting: connectionState.isConnecting,
          retryCount: connectionState.retryCount,
          circuitBreakerState: connectionState.circuitBreakerState,
          lastError: connectionState.lastError?.message
        }
      });
      
    } catch (error) {
      console.error('Database health check error:', error);
      res.status(503).json({
        status: 'error',
        message: 'Health check failed',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Detailed system status endpoint
  app.get("/api/health/detailed", async (req, res) => {
    try {
      const detailedHealth = {
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          cpu: process.cpuUsage(),
          pid: process.pid,
          version: process.version,
          platform: process.platform,
          arch: process.arch
        },
        database: {
          health: await checkDatabaseHealth(),
          connectionState: connectionState,
          config: {
            retryAttempts: process.env.MONGO_RETRY_ATTEMPTS || 5,
            connectionTimeout: process.env.MONGO_CONNECTION_TIMEOUT || 30000,
            socketTimeout: process.env.MONGO_SOCKET_TIMEOUT || 45000,
            maxPoolSize: process.env.MONGO_MAX_POOL_SIZE || 10
          }
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          port: process.env.PORT || 5000,
          mongoUri: process.env.MONGO_URI ? 'configured' : 'not configured'
        },
        timestamp: new Date().toISOString()
      };
      
      res.json(detailedHealth);
      
    } catch (error) {
      console.error('Detailed health check error:', error);
      res.status(500).json({
        error: 'Failed to get detailed health information',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // === Routes ===
  const authRoutes = require("./routes/auth.js");
  const issueRoutes = require("./routes/issues.js");
  const profileRoutes = require("./routes/profileRoutes.js");
  const contributionsRoutes = require("./routes/contributions.js");

  // CSRF token endpoint
  app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/issues", issueRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/contributors", contributionsRoutes);

  // === Swagger API Docs ===
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // === Error Handlers ===
  // CSRF Error Handler (must come before global error handler)
  app.use(csrfErrorHandler);

  // Global Error Handler
  const errorHandler = require("./middlewares/errorHandler.js");
  app.use(errorHandler);

  // === Start Server ===
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/api/health`);
    console.log(`Database health check at http://localhost:${PORT}/api/health/db`);
  });

  // Enhanced graceful shutdown
  const enhancedGracefulShutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
    
    // Stop accepting new connections
    server.close(() => {
      console.log('✅ HTTP server closed');
    });
    
    // Close database connection
    try {
      await gracefulShutdown();
    } catch (error) {
      console.error('❌ Error during database shutdown:', error.message);
    }
    
    // Exit process
    process.exit(0);
  };

  // Handle shutdown signals
  process.on('SIGINT', () => enhancedGracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => enhancedGracefulShutdown('SIGTERM'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);
    enhancedGracefulShutdown('uncaughtException');
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
    enhancedGracefulShutdown('unhandledRejection');
  });
}
