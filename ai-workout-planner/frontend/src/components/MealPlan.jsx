import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MealPlan() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    api.get('/meals')
      .then(res => setMeals(res.data || []))
      .catch(() => setMeals([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/meals', { name, calories: Number(calories) });
      setMeals([...meals, res.data]);
    } catch (err) {
      setMeals([...meals, { id: Date.now(), name, calories: Number(calories) }]);
    }
    setName('');
    setCalories('');
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', color: '#ff2a85' }}>
        🥑 Track Daily Meal
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Meal description (e.g. 200g Chicken, Jasmine Rice, Avocado)" 
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
          value={calories} 
          onChange={e => setCalories(e.target.value)} 
          placeholder="Estimated Calories (kcal)" 
          type="number" 
          required 
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: '16px',
            background: 'rgba(10, 14, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            maxWidth: '240px'
          }}
        />
        <button type="submit" className="spatial-btn-primary" style={{ alignSelf: 'flex-start' }}>
          <span>+ Log Meal Intake</span>
        </button>
      </form>
      
      {meals.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>Logged Meals</h4>
          {meals.map(m => (
            <div 
              key={m.id} 
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
              <strong style={{ color: '#fff' }}>{m.name}</strong>
              <span className="genz-pill pink">
                {m.calories} kcal
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlan;
