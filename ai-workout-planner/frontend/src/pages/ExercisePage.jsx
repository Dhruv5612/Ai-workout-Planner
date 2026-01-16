import React, { useState } from 'react';
import SharedHeader from '../components/SharedHeader';
import './ExercisePage.css';

const ExercisePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Exercises' },
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
      description: 'Classic bodyweight exercise that targets chest, shoulders, and triceps.',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      instructions: [
        'Start in a plank position with hands slightly wider than shoulders',
        'Lower your body until chest nearly touches the floor',
        'Push back up to starting position',
        'Keep your core tight throughout the movement'
      ],
      image: '/images/exercises/Pushups.jpeg'
    },
    {
      id: 2,
      name: 'Pull-ups',
      category: 'back',
      difficulty: 'Intermediate',
      description: 'Upper body strength exercise that primarily targets the back muscles.',
      muscleGroups: ['Back', 'Biceps', 'Shoulders'],
      instructions: [
        'Grab the pull-up bar with hands slightly wider than shoulders',
        'Hang with arms fully extended',
        'Pull your body up until chin is above the bar',
        'Lower back down with control'
      ],
      image: '/images/exercises/pull-ups.avif'
    },
    {
      id: 3,
      name: 'Squats',
      category: 'legs',
      difficulty: 'Beginner',
      description: 'Fundamental lower body exercise that builds strength and stability.',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower your body as if sitting back into a chair',
        'Keep knees behind toes and chest up',
        'Return to standing position'
      ],
      image: '/images/exercises/squat.webp'
    },
    {
      id: 4,
      name: 'Plank',
      category: 'core',
      difficulty: 'Beginner',
      description: 'Isometric core exercise that improves stability and posture.',
      muscleGroups: ['Core', 'Shoulders', 'Back'],
      instructions: [
        'Start in a forearm plank position',
        'Keep your body in a straight line from head to heels',
        'Engage your core and hold the position',
        'Breathe steadily throughout'
      ],
      image: '/images/exercises/plank.jpg'
    },
    {
      id: 5,
      name: 'Deadlift',
      category: 'back',
      difficulty: 'Advanced',
      description: 'Compound exercise that targets multiple muscle groups for overall strength.',
      muscleGroups: ['Back', 'Glutes', 'Hamstrings', 'Core'],
      instructions: [
        'Stand with feet hip-width apart, bar in front',
        'Bend at hips and knees to grasp the bar',
        'Keep back straight and lift bar by extending hips and knees',
        'Lower bar back down with control'
      ],
      image: '/images/exercises/deadlift.jpg'
    },
    {
      id: 6,
      name: 'Bench Press',
      category: 'chest',
      difficulty: 'Intermediate',
      description: 'Classic chest exercise that builds upper body strength and muscle.',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      instructions: [
        'Lie on bench with feet flat on floor',
        'Grip bar slightly wider than shoulder width',
        'Lower bar to chest with control',
        'Press bar back up to starting position'
      ],
      image: '/images/exercises/benchpress.jpg'
    },
    {
      id: 7,
      name: 'Overhead Press',
      category: 'shoulders',
      difficulty: 'Intermediate',
      description: 'Shoulder press exercise that builds upper body strength.',
      muscleGroups: ['Shoulders', 'Triceps', 'Core'],
      instructions: [
        'Stand with feet shoulder-width apart',
        'Hold weights at shoulder level',
        'Press weights overhead while keeping core tight',
        'Lower weights back to shoulders'
      ],
      image: '/images/exercises/overheadPress.webp'
    },
    {
      id: 8,
      name: 'Bicep Curls',
      category: 'arms',
      difficulty: 'Beginner',
      description: 'Isolation exercise that targets the biceps for arm development.',
      muscleGroups: ['Biceps', 'Forearms'],
      instructions: [
        'Stand with dumbbells at sides',
        'Curl weights up toward shoulders',
        'Keep elbows close to body',
        'Lower weights back down with control'
      ],
      image: '/images/exercises/bicepscurel.webp'
    },
    {
      id: 9,
      name: 'Lunges',
      category: 'legs',
      difficulty: 'Beginner',
      description: 'Dynamic leg exercise that improves balance and coordination.',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      instructions: [
        'Step forward with one leg',
        'Lower your body until both knees are bent',
        'Keep front knee behind toes',
        'Push back to starting position'
      ],
      image: '/images/exercises/lunges.webp'
    },
    {
      id: 10,
      name: 'Burpees',
      category: 'cardio',
      difficulty: 'Intermediate',
      description: 'Full-body exercise that combines strength and cardiovascular training.',
      muscleGroups: ['Full Body', 'Cardio'],
      instructions: [
        'Start standing, then squat down',
        'Place hands on ground and jump feet back',
        'Perform a push-up, then jump feet forward',
        'Jump up with arms overhead'
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="exercise-page">
      <SharedHeader />
      
      <div className="exercise-header">
        <h1>Exercise Library</h1>
        <p>Discover and learn proper form for various body exercises</p>
      </div>

      <div className="exercise-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search exercises..."
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
          <div key={exercise.id} className="exercise-card">
            <div className="exercise-image">
              {exercise.image ? (
                <img src={exercise.image} alt={exercise.name} className="exercise-img" />
              ) : (
                <div className="exercise-placeholder">
                  {exercise.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="exercise-content">
              <div className="exercise-header-info">
                <h3>{exercise.name}</h3>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
                >
                  {exercise.difficulty}
                </span>
              </div>
              
              <p className="exercise-description">{exercise.description}</p>
              
              <div className="muscle-groups">
                <strong>Target Muscles:</strong>
                <div className="muscle-tags">
                  {exercise.muscleGroups.map((muscle, index) => (
                    <span key={index} className="muscle-tag">{muscle}</span>
                  ))}
                </div>
              </div>

              <div className="exercise-instructions">
                <strong>Instructions:</strong>
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
        <div className="no-results">
          <p>No exercises found matching your criteria.</p>
          <button 
            className="reset-filters"
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