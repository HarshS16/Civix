const pool = require('../config/mongo.js');
const xss = require('xss');
const asyncHandler = require('../utils/asyncHandler.js');

const getUserByEmail = asyncHandler(async (req, res) => {
  const email = xss(req.params.email);
  const result = await pool.query(
    'SELECT id, username, email, role, location, complaints, last_activity FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(result.rows[0]);
});

const updateUserByEmail = asyncHandler(async (req, res) => {
  const currentEmail = xss(req.params.email);
  const username = xss(req.body.username);
  const newEmail = xss(req.body.email);
  const location = xss(req.body.location);

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
});

module.exports = {
  getUserByEmail,
  updateUserByEmail
};
