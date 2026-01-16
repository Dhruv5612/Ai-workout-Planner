import React from 'react';
import WorkoutForm from '../components/WorkoutForm';
import MealPlan from '../components/MealPlan';

function Planner() {
  return (
    <div>
      <h2>Planner</h2>
      <WorkoutForm />
      <MealPlan />
    </div>
  );
}

export default Planner; 