import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharedHeader from '../components/SharedHeader';
import api from '../services/api';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request' | 'reset'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email: email.trim() });
      setSuccessMsg(res.data?.message || 'Password reset code sent to your email.');
      setStep('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset with OTP & New Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/reset-password', {
        email: email.trim(),
        otp: otp.trim(),
        newPassword
      });

      setSuccessMsg(res.data?.message || 'Password reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <SharedHeader />
      <div className="auth-card">
        {step === 'request' ? (
          <>
            <div className="auth-header">
              <div className="genz-pill purple" style={{ marginBottom: '1rem' }}>
                <span>✦ ACCOUNT RECOVERY</span>
              </div>
              <h1>Reset Password</h1>
              <p>Enter your account email to receive a 6-digit recovery code</p>
            </div>

            <form onSubmit={handleRequestOtp} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Recovery Code →'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Remembered your password?{' '}
                <Link to="/login" className="auth-link">
                  Back to Sign In
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <div className="genz-pill purple" style={{ marginBottom: '1rem' }}>
                <span>✦ NEW PASSWORD VERIFICATION</span>
              </div>
              <h1>Enter Code & New Password</h1>
              <p>
                Code sent to <strong style={{ color: '#00f5ff' }}>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleResetSubmit} className="auth-form">
              <div className="form-group" style={{ textAlign: 'center' }}>
                <label htmlFor="otp" style={{ alignSelf: 'center', marginBottom: '0.5rem' }}>
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  id="otp"
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

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (6+ chars)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
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
                {loading ? 'Updating Password...' : 'Save Password & Log In ⚡'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => { setStep('request'); setError(''); setSuccessMsg(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.65)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  ← Request a different email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

