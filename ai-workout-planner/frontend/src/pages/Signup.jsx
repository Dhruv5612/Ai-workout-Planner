import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharedHeader from '../components/SharedHeader';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [targetEmail, setTargetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

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

  // Step 1: Submit Registration Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        username: formData.email.split('@')[0].trim()
      });

      if (response.data?.requireOtp) {
        setTargetEmail(response.data.email || formData.email.trim());
        setStep('otp');
        setSuccessMsg(response.data.message || `Verification code sent to ${formData.email}`);
        setResendCooldown(60);
      } else {
        // Fallback for direct token response
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        if (response.data.user) {
          setUser(response.data.user);
        }
        navigate('/');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit OTP Code
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const response = await api.post('/auth/verify-signup-otp', {
        email: targetEmail,
        otp: otp.trim()
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.user) {
        setUser(response.data.user);
      }
      navigate('/');
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.response?.data?.message || 'Invalid or expired verification code');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/resend-otp', {
        email: targetEmail,
        purpose: 'signup'
      });
      setSuccessMsg(response.data?.message || 'A fresh verification code was sent to your email.');
      setResendCooldown(60);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <SharedHeader />
      <div className="auth-card">
        {step === 'form' ? (
          <>
            <div className="auth-header">
              <div className="genz-pill pink" style={{ marginBottom: '1rem' }}>
                <span>✦ JOIN THE FIT FAM</span>
              </div>
              <h1>Create Account</h1>
              <p>Sign up to start your personalized AI fitness journey</p>
              {error && <div className="error-message">{error}</div>}
            </div>
            
            <form onSubmit={handleFormSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
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
                  placeholder="Create a strong password (6+ chars)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                />
              </div>
              
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" required defaultChecked />
                  <span>I agree to Terms & Privacy Policy</span>
                </label>
              </div>
              
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Sending Code...' : 'Get Verification Code →'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <div className="genz-pill pink" style={{ marginBottom: '1rem' }}>
                <span>✦ VERIFY EMAIL ADDRESS</span>
              </div>
              <h1>Enter Code</h1>
              <p>
                We sent a 6-digit confirmation code to <br />
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
                {loading ? 'Activating Account...' : 'Confirm & Complete Registration 🚀'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => { setStep('form'); setOtp(''); setError(''); setSuccessMsg(''); }}
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

export default Signup;
