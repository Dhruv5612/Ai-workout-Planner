import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MealPlan() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    api.get('/meals').then(res => setMeals(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/meals', { name, calories: Number(calories) });
    setMeals([...meals, res.data]);
    setName('');
    setCalories('');
  };

  return (
    <div>
      <h3>Add Meal</h3>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Meal Name" required />
        <input value={calories} onChange={e => setCalories(e.target.value)} placeholder="Calories" type="number" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {meals.map(m => (
          <li key={m.id}>{m.name}: {m.calories} kcal</li>
        ))}
      </ul>
    </div>
  );
}

export default MealPlan; 