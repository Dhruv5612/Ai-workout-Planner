import React, { useState, useEffect } from 'react';
import api from '../services/api';

function WorkoutForm() {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState('');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api.get('/workouts')
      .then(res => setWorkouts(res.data || []))
      .catch(() => setWorkouts([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exArr = exercises.split(',').map(e => e.trim()).filter(Boolean);
    try {
      const res = await api.post('/workouts', { name, exercises: exArr });
      setWorkouts([...workouts, res.data]);
    } catch (err) {
      // client-side fallback if backend route isn't available
      setWorkouts([...workouts, { id: Date.now(), name, exercises: exArr }]);
    }
    setName('');
    setExercises('');
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', color: '#00f5ff' }}>
        ⚡ Log Custom Workout
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Workout Name (e.g., Heavy Push Day)" 
          required 
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: '16px',
            background: 'rgba(10, 14, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <input 
          value={exercises} 
          onChange={e => setExercises(e.target.value)} 
          placeholder="Exercises comma separated (e.g., Incline Press, Lateral Raise, Tricep Pushdown)" 
          required 
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: '16px',
            background: 'rgba(10, 14, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button type="submit" className="spatial-btn-primary" style={{ alignSelf: 'flex-start' }}>
          <span>+ Add Workout Split</span>
        </button>
      </form>
      
      {workouts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>Logged Splits</h4>
          {workouts.map(w => (
            <div 
              key={w.id} 
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <strong style={{ color: '#fff' }}>{w.name}</strong>
              <span style={{ color: '#00f5a0', fontSize: '0.9rem' }}>
                {Array.isArray(w.exercises) ? w.exercises.join(' • ') : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutForm;
