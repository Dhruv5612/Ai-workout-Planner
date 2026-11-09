import React, { useState, useEffect } from 'react';
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
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [targetEmail, setTargetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const { setUser, setSubscription } = useAuth();

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Step 1: Submit Credentials
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    api.post('/auth/login', {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password,
    })
      .then((res) => {
        if (res.data?.requireOtp) {
          setTargetEmail(res.data.email);
          setStep('otp');
          setSuccessMsg(res.data.message || `Verification code sent to ${res.data.email}`);
          setResendCooldown(60);
        } else {
          // Fallback for direct token response
          const token = res.data?.token;
          const user = res.data?.user;
          if (token) localStorage.setItem('token', token);
          if (user) {
            setUser(user);
            if (user.subscription) setSubscription(user.subscription);
          }
          navigate('/');
        }
      })
      .catch((err) => {
        const message = !err.response
          ? 'Cannot connect to backend server. Please ensure the backend server is running on port 5000.'
          : (err.response?.data?.message || 'Invalid credentials. Please try again.');
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    api.post('/auth/verify-login-otp', {
      email: targetEmail,
      otp: otp.trim()
    })
      .then((res) => {
        const token = res.data?.token;
        const user = res.data?.user;
        if (token) localStorage.setItem('token', token);
        if (user) {
          setUser(user);
          if (user.subscription) setSubscription(user.subscription);
        }
        navigate('/');
      })
      .catch((err) => {
        const message = !err.response
          ? 'Cannot connect to backend server. Please ensure the backend server is running on port 5000.'
          : (err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);

    api.post('/auth/resend-otp', {
      email: targetEmail,
      purpose: 'login'
    })
      .then((res) => {
        setSuccessMsg(res.data?.message || 'A fresh verification code has been sent!');
        setResendCooldown(60);
      })
      .catch((err) => {
        const message = !err.response
          ? 'Cannot connect to backend server. Please ensure the backend server is running on port 5000.'
          : (err.response?.data?.message || 'Failed to resend code.');
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <SharedHeader />
      <div className="auth-card">
        {step === 'credentials' ? (
          <>
            <div className="auth-header">
              <div className="genz-pill" style={{ marginBottom: '1rem' }}>
                <span>✦ SECURE 2-FACTOR SIGN IN</span>
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in with your email & password to receive your login code</p>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="auth-form">
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
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Sending Code...' : 'Continue with OTP →'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Create Account
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <div className="genz-pill" style={{ marginBottom: '1rem' }}>
                <span>✦ TWO-FACTOR VERIFICATION</span>
              </div>
              <h1>Enter Login Code</h1>
              <p>
                We sent a 6-digit verification code to <br />
                <strong style={{ color: '#00f5ff' }}>{targetEmail}</strong>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="auth-form">
              <div className="form-group" style={{ textAlign: 'center' }}>
                <label htmlFor="otp" style={{ alignSelf: 'center', marginBottom: '0.5rem' }}>
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •"
                  maxLength={6}
                  autoFocus
                  required
                  style={{
                    letterSpacing: '12px',
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    textAlign: 'center',
                    color: '#00f5ff',
                    fontFamily: 'monospace',
                    padding: '1rem'
                  }}
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {successMsg && (
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: '14px',
                    background: 'rgba(0, 245, 160, 0.15)',
                    border: '1px solid rgba(0, 245, 160, 0.4)',
                    color: '#00f5a0',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  {successMsg}
                </div>
              )}

              <button type="submit" className="auth-button" disabled={loading || otp.length < 6}>
                {loading ? 'Verifying...' : 'Verify & Sign In ⚡'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setOtp(''); setError(''); setSuccessMsg(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.65)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: resendCooldown > 0 ? 'rgba(255, 255, 255, 0.4)' : '#00f5ff',
                    cursor: resendCooldown > 0 ? 'default' : 'pointer',
                    fontWeight: '700'
                  }}
                >
                  {resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend Code'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
