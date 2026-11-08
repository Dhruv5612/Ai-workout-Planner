import React from 'react';

function ChallengeMode() {
  return (
    <div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', color: '#ff2a85' }}>
        ⚔️ Active Community Challenge
      </h3>
      <div 
        style={{
          padding: '1.5rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.12), rgba(157, 78, 221, 0.12))',
          border: '1px solid rgba(255, 42, 133, 0.35)',
          marginBottom: '1.5rem'
        }}
      >
        <span className="genz-pill pink" style={{ marginBottom: '0.75rem' }}>
          WEEK 44 GAUNTLET
        </span>
        <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', margin: '0.5rem 0' }}>
          5-Day Iron Consistency Sprint
        </h4>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
          Complete 5 scheduled workouts and hit at least 1 progressive overload PR this week.
        </p>

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#00f5ff', fontWeight: '700', fontSize: '0.9rem' }}>Progress: 3 / 5 Done</span>
          <span style={{ color: '#ffaa00', fontWeight: '800', fontSize: '0.9rem' }}>🏆 +500 XP</span>
        </div>
      </div>

      <button className="spatial-btn-primary" style={{ width: '100%' }}>
        <span>Log Today's Challenge Reps 🔥</span>
      </button>
    </div>
  );
}

export default ChallengeMode;
