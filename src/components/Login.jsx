import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;

      // Decode token to get role
      const decoded = jwtDecode(token);

      // Save token in localStorage or better: in-memory or httpOnly cookie (demo uses localStorage)
      localStorage.setItem('token', token);

      // Redirect based on role
      if (decoded.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container login">
      <div className="auth-image login-image"></div>
      <div className="auth-form">
        <h2 >Login</h2>
        <form onSubmit={handleSubmit} >
            <input 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 

            />
            <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            />
            <button type="submit">Login</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
        <p>Don't have an account? <Link to="/signup">signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
