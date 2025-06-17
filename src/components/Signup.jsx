import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  // For error messages
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple password confirmation check
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201 || res.status === 200) {
        // Redirect to login page or dashboard on success
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container signup">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
      <div className="auth-image signup-image"></div>
    </div>
  );
};

export default Signup;
