import React from 'react';
import SharedHeader from '../components/SharedHeader';
import WorkoutForm from '../components/WorkoutForm';
import MealPlan from '../components/MealPlan';

function Planner() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 5vw 5rem', position: 'relative' }}>
      <SharedHeader />
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="genz-pill" style={{ marginBottom: '1rem' }}>
            <span>✦ DAILY LOGS & MACROS</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Workout & Meal <span className="holo-aurora">Planner</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            Log customized training splits and track daily caloric intakes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <WorkoutForm />
          </div>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <MealPlan />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;
