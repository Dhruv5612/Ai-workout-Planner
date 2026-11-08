import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, isPremium } = useAuth();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Please sign in to view your athlete profile and sync AI routines.
        </p>
        <Link to="/login" className="spatial-btn-primary">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f5ff, #9d4edd)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#07090e',
            boxShadow: '0 0 25px rgba(0, 245, 255, 0.4)'
          }}
        >
          {(user.name || user.email || 'A').charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', margin: 0 }}>
            {user.name || 'Planfit Athlete'}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0.2rem 0 0 0' }}>{user.email}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className={`genz-pill ${isPremium() ? 'purple' : ''}`}>
            {isPremium() ? '✦ PRO TIER' : 'FREE TIER'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.3rem' }}>STATUS</span>
          <strong style={{ color: '#00f5a0', fontSize: '1.1rem' }}>Active Lifter</strong>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.3rem' }}>STREAK</span>
          <strong style={{ color: '#ffaa00', fontSize: '1.1rem' }}>🔥 14 Days</strong>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.3rem' }}>SPLIT TYPE</span>
          <strong style={{ color: '#00f5ff', fontSize: '1.1rem' }}>PPL Hypertrophy</strong>
        </div>
      </div>
    </div>
  );
}

export default Profile;
