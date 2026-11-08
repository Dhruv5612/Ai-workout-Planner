import React from 'react';
import SharedHeader from '../components/SharedHeader';
import Profile from '../components/Profile';
import WeeklyGoal from '../components/WeeklyGoal';

function ProfilePage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 5vw 5rem', position: 'relative' }}>
      <SharedHeader />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="genz-pill purple" style={{ marginBottom: '1rem' }}>
            <span>✦ ATHLETE PROFILE & TARGETS</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Your Fitness <span className="holo-aurora">Command Center</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            Manage account status, membership tiers, and weekly milestones.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <Profile />
          </div>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <WeeklyGoal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
