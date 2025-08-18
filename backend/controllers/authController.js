const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/mongo.js"); // Assuming you have a pool setup for MongoDB
require("dotenv").config();
const {asyncHandler}=require("../utils/asyncHandler")



exports.signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const validuserdata = z.object({
    username: z.string()
      .min(4, "Username must have 4 characters")
      .regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers allowed")
      .max(16, "Username cannot be longer than 16 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string()
      .min(6, "Minimum password length is 6")
      .regex(/[a-z]/, "At least one lowercase letter required")
      .regex(/[0-9]/, "At least one number required")
      .regex(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, "At least one special character required")
  });
  const result = validuserdata.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors[0].message });
  }

  const role = email.endsWith(process.env.DOMAIN_NAME) ? "admin" : "user";

  const check = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );

  if (check.rows.length > 0) {
    const user = check.rows[0];
    if (user.email === email) {
      return res.status(409).json({ error: "Email already registered" });
    }
    if (user.username === username) {
      return res.status(409).json({ error: "Username already taken" });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
    [username, email, hashedPassword, role]
  );

  return res.status(201).json({ message: "User registered successfully" });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token, message: "Login successful" });
});


