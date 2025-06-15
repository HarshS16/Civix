const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pg = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create users table with role field
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100),
    password TEXT,
    role VARCHAR(10) DEFAULT 'user'
  );
`).catch(err => console.error('Error creating table:', err));

// Signup route with role logic
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const role = email.endsWith(process.env.DOMAIN_NAME) ? 'admin' : 'user';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
      [username, email, hashedPassword, role]
    );
    res.status(201).send('User registered');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login route with role from DB
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Use role from DB
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
