import React, { useState } from 'react';

function WeeklyGoal() {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedGoal(goal);
    setGoal('');
  };

  return (
    <div>
      <h3>Weekly Goal</h3>
      <form onSubmit={handleSubmit}>
        <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Set your goal" />
        <button type="submit">Save</button>
      </form>
      {savedGoal && <p>Current goal: {savedGoal}</p>}
    </div>
  );
}

export default WeeklyGoal; 