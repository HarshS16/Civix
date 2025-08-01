const express = require('express');
const router = express.Router();
const pool = require('../config/mongo.js'); // Assuming you have a pool setup for MongoDB
const xss = require('xss');

// GET user profile by email
router.get('/:email', async (req, res) => {
  try {
    const email = xss(req.params.email);
    const result = await pool.query(
      'SELECT id, username, email, role, location, complaints, last_activity FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user profile by email
router.put('/:email', async (req, res) => {
  const currentEmail = xss(req.params.email);
  const username = xss(req.body.username);
  const newEmail = xss(req.body.email);
  const location = xss(req.body.location);

  try {
    const result = await pool.query(
      `UPDATE users 
       SET username = $1, email = $2, location = $3 
       WHERE email = $4 
       RETURNING id, username, email, role, location, complaints, last_activity`,
      [username, newEmail, location, currentEmail]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
