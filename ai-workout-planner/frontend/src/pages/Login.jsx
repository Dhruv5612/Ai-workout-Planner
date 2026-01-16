import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharedHeader from '../components/SharedHeader';
import './Login.css';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setSubscription } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    api.post('/auth/login', {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password,
    })
    .then((res) => {
      const token = res.data?.token;
      const user = res.data?.user;
      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        setUser(user);
        if (user.subscription) {
          setSubscription(user.subscription);
        }
      }
      navigate('/');
    })
    .catch((err) => {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    })
    .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <SharedHeader />
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Planfit account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Enter your email or username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>
          
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; 