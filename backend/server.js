const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();

// === Database Initialization ===

// ^ Whole Backend is a mess, I removed too much buggy code, and somehow i have commented the following 2 lines, idk why there are 2 databases here..... but they were causing failure to run the backend.

// require("./config/db.js");     // PostgreSQL
require("./config/mongo.js");  // MongoDB

// === Swagger Docs ===
const { swaggerUi, specs } = require("./config/swagger.js");

// === Middlewares ===
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://civix-phi.vercel.app/login",
    "https://civix-phi.vercel.app/signup",
  ],
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
const contributionsRoutes = require("./routes/contributions.js")


app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contributors", contributionsRoutes)


// === Swagger API Docs ===
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// === Global Error Handler ===
const errorHandler = require("./middlewares/errorHandler.js");
app.use(errorHandler);

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
