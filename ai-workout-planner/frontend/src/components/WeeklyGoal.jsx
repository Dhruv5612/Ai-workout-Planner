import React, { useState } from 'react';

function WeeklyGoal() {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('Hit 4 Heavy Lifting Sessions & 150g Protein Daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setSavedGoal(goal);
    setGoal('');
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', color: '#00f5ff' }}>
        🎯 Weekly Micro-Goal
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input 
          value={goal} 
          onChange={e => setGoal(e.target.value)} 
          placeholder="Set a new weekly target (e.g. 5 workouts, 20k steps)" 
          style={{
            flex: '1',
            minWidth: '240px',
            padding: '0.9rem 1.25rem',
            borderRadius: '16px',
            background: 'rgba(10, 14, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button type="submit" className="spatial-btn-primary">
          <span>Lock In Goal 🔒</span>
        </button>
      </form>
      {savedGoal && (
        <div 
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '18px',
            background: 'rgba(0, 245, 160, 0.08)',
            border: '1px solid rgba(0, 245, 160, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '1.6rem' }}>⚡</span>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#00f5a0', fontWeight: '800', letterSpacing: '0.06em' }}>CURRENT FOCUS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>{savedGoal}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyGoal;
