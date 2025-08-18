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
  require("./config/mongo.js"); // MongoDB

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
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
