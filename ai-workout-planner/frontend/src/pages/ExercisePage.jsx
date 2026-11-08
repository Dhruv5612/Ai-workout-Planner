import React, { useState } from 'react';
import SharedHeader from '../components/SharedHeader';
import './ExercisePage.css';

const ExercisePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Moves' },
    { id: 'chest', name: 'Chest' },
    { id: 'back', name: 'Back' },
    { id: 'shoulders', name: 'Shoulders' },
    { id: 'arms', name: 'Arms' },
    { id: 'legs', name: 'Legs' },
    { id: 'core', name: 'Core' },
    { id: 'cardio', name: 'Cardio' }
  ];

  const exercises = [
    {
      id: 1,
      name: 'Push-ups',
      category: 'chest',
      difficulty: 'Beginner',
      description: 'Classic bodyweight compound move targeting chest, anterior delts, and triceps.',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      instructions: [
        'Start in a rigid plank position with hands shoulder-width apart',
        'Lower chest smoothly until it hovers 1 inch above the floor',
        'Explode back up through palms while keeping core clamped',
        'Keep neck neutral and elbows angled at ~45 degrees'
      ],
      image: '/images/exercises/Pushups.jpeg'
    },
    {
      id: 2,
      name: 'Pull-ups',
      category: 'back',
      difficulty: 'Intermediate',
      description: 'The king of upper body pulling movements for crazy lats and grip strength.',
      muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
      instructions: [
        'Overhand grip slightly wider than shoulder width',
        'Dead hang with engaged scapula to start',
        'Drive elbows down towards hips until chin clears bar',
        'Control the descent over 2-3 full seconds'
      ],
      image: '/images/exercises/pull-ups.avif'
    },
    {
      id: 3,
      name: 'Barbell Squats',
      category: 'legs',
      difficulty: 'Beginner',
      description: 'Fundamental lower body builder that blasts quads, glutes, and core bracing.',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      instructions: [
        'Feet shoulder-width apart, toes flared slightly out',
        'Hinge hips back and drive knees out over toes',
        'Hit parallel or below with a flat spine',
        'Drive through mid-foot back to full hip extension'
      ],
      image: '/images/exercises/squat.webp'
    },
    {
      id: 4,
      name: 'Forearm Plank',
      category: 'core',
      difficulty: 'Beginner',
      description: 'Anti-extension isometric core hold for deep abdominal stability.',
      muscleGroups: ['Transverse Abdominis', 'Obliques', 'Shoulders'],
      instructions: [
        'Elbows stacked directly under shoulders',
        'Create a straight line from crown of head to heels',
        'Squeeze glutes hard and pull belly button to spine',
        'Maintain steady diaphragmatic nasal breathing'
      ],
      image: '/images/exercises/plank.jpg'
    },
    {
      id: 5,
      name: 'Conventional Deadlift',
      category: 'back',
      difficulty: 'Advanced',
      description: 'Heavy compound hinge movement that develops raw posterior chain power.',
      muscleGroups: ['Lower Back', 'Glutes', 'Hamstrings', 'Traps'],
      instructions: [
        'Feet hip-width apart, bar cutting across mid-foot',
        'Hinge at hips, grip bar outside shins, pull slack out',
        'Brace lats tight like squeezing oranges in armpits',
        'Push the floor away through feet to lockout'
      ],
      image: '/images/exercises/deadlift.jpg'
    },
    {
      id: 6,
      name: 'Flat Bench Press',
      category: 'chest',
      difficulty: 'Intermediate',
      description: 'Standard barbell chest builder for raw pressing power and pec hypertrophy.',
      muscleGroups: ['Pectorals', 'Triceps', 'Front Delts'],
      instructions: [
        'Lie on bench with eyes under barbell, feet planted firm',
        'Grip bar slightly wider than shoulders, pull shoulder blades back',
        'Lower bar with control to lower chest/nipple line',
        'Press bar up and slightly back over shoulders'
      ],
      image: '/images/exercises/benchpress.jpg'
    },
    {
      id: 7,
      name: 'Overhead Press',
      category: 'shoulders',
      difficulty: 'Intermediate',
      description: 'Vertical pressing compound that sculpts boulder shoulders and tricep power.',
      muscleGroups: ['Deltoids', 'Triceps', 'Upper Chest'],
      instructions: [
        'Stand tall, feet hip-width apart with bar at collarbone',
        'Tuck chin slightly, press barbell straight vertically',
        'Once bar passes forehead, push head forward into the window',
        'Lower with full control back to front delts'
      ],
      image: '/images/exercises/overheadPress.webp'
    },
    {
      id: 8,
      name: 'Incline Dumbbell Bicep Curls',
      category: 'arms',
      difficulty: 'Beginner',
      description: 'Deep stretch isolation movement maximizing the long head of the bicep.',
      muscleGroups: ['Biceps Brachii', 'Brachialis'],
      instructions: [
        'Set bench to 45-60 degree incline and sit back',
        'Start with arms hanging fully extended for max stretch',
        'Supinate wrists and curl weights up while keeping elbows pinned',
        'Squeeze at peak contraction for 1 second, lower slowly'
      ],
      image: '/images/exercises/bicepscurel.webp'
    },
    {
      id: 9,
      name: 'Walking Dumbbell Lunges',
      category: 'legs',
      difficulty: 'Beginner',
      description: 'Unilateral leg punishment for balance, glute hypertrophy, and hip mobility.',
      muscleGroups: ['Quads', 'Glutes', 'Calves'],
      instructions: [
        'Hold dumbbells at sides with tall athletic posture',
        'Take a controlled stride forward, lowering back knee near floor',
        'Drive through front heel to step directly into next lunge',
        'Keep torso upright and avoid knee cave-in'
      ],
      image: '/images/exercises/lunges.webp'
    },
    {
      id: 10,
      name: 'Explosive Burpees',
      category: 'cardio',
      difficulty: 'Intermediate',
      description: 'High-intensity conditioning drill that ignites metabolism and VO2 max.',
      muscleGroups: ['Full Body', 'Cardiovascular System'],
      instructions: [
        'From standing, drop into a deep squat and plant hands',
        'Kick feet back into plank and drop chest to deck',
        'Press up explosively and snap feet back under hips',
        'Jump vertically, clapping hands overhead'
      ],
      image: '/images/exercises/burpee.webp'
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="exercise-page">
      <SharedHeader />
      
      <div className="exercise-ambient-glow glow-top"></div>
      <div className="exercise-ambient-glow glow-bottom"></div>

      <div className="exercise-header">
        <div className="genz-pill">
          <span>✦ 3D MOTION DATABASE • FORM PERFECTED</span>
        </div>
        <h1>The Next-Gen <span className="holo-aurora">Exercise Lab</span></h1>
        <p>Master biomechanics, eliminate injury risk, and target exact muscle groups with neural instructions.</p>
      </div>

      <div className="exercise-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search moves, muscles, or cues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="exercises-grid">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="exercise-card glass-panel">
            <div className="exercise-image-pod">
              {exercise.image ? (
                <img 
                  src={exercise.image} 
                  alt={exercise.name} 
                  className="exercise-img" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : null}
              <div className="exercise-category-chip">
                {exercise.category.toUpperCase()}
              </div>
            </div>
            
            <div className="exercise-content">
              <div className="exercise-header-info">
                <h3>{exercise.name}</h3>
                <span className={`difficulty-badge diff-${exercise.difficulty.toLowerCase()}`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <p className="exercise-description">{exercise.description}</p>
              
              <div className="muscle-groups">
                <span className="muscle-label">TARGET MUSCLES</span>
                <div className="muscle-tags">
                  {exercise.muscleGroups.map((muscle, index) => (
                    <span key={index} className="muscle-tag">{muscle}</span>
                  ))}
                </div>
              </div>

              <div className="exercise-instructions">
                <span className="instructions-label">FORM EXECUTION CUES</span>
                <ol>
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="no-results glass-panel">
          <span className="no-results-icon">🛸</span>
          <h3>No moves found</h3>
          <p>No exercises match "{searchTerm}". Try clearing your filters.</p>
          <button 
            className="spatial-btn-primary"
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
