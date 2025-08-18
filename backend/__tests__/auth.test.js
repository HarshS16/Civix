const request = require('supertest');
// Assuming your main express app file is app.js or server.js
// You might need to export your app for testing, e.g., module.exports = app;
const app = require('../app'); // Adjust this path to your main app file
const User = require('../models/User'); // Adjust path to your User model

describe('Auth API', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register') // Assuming this is your registration endpoint
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token'); // Or whatever you return on success

    const userInDb = await User.findOne({ email: 'test@example.com' });
    expect(userInDb).not.toBeNull();
  });
});
