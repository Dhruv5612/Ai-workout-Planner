import React, { useState, useEffect } from 'react';
import api from '../services/api';

function WorkoutForm() {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState('');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api.get('/workouts').then(res => setWorkouts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exArr = exercises.split(',').map(e => e.trim()).filter(Boolean);
    const res = await api.post('/workouts', { name, exercises: exArr });
    setWorkouts([...workouts, res.data]);
    setName('');
    setExercises('');
  };

  return (
    <div>
      <h3>Add Workout</h3>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Workout Name" required />
        <input value={exercises} onChange={e => setExercises(e.target.value)} placeholder="Exercises (comma separated)" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {workouts.map(w => (
          <li key={w.id}>{w.name}: {w.exercises.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutForm; 