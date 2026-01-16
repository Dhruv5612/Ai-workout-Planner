import React, { useState } from 'react';
import SharedHeader from '../components/SharedHeader';
import PremiumFeature from '../components/PremiumFeature';
import { useAuth } from '../context/AuthContext';
import './ToolsPage.css';

const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState('bmi');
  const { isPremium } = useAuth();
  const [bmiData, setBmiData] = useState({ weight: '', height: '', unit: 'metric' });
  const [bmiResult, setBmiResult] = useState(null);
  const [calorieData, setCalorieData] = useState({ 
    age: '', 
    weight: '', 
    height: '', 
    gender: 'male', 
    activity: 'moderate',
    goal: 'maintain'
  });
  const [calorieResult, setCalorieResult] = useState(null);
  const [timerData, setTimerData] = useState({ minutes: '', seconds: '' });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [oneRepMaxData, setOneRepMaxData] = useState({ weight: '', reps: '' });
  const [oneRepMaxResult, setOneRepMaxResult] = useState(null);

  // Workout Generator state
  const [wgStep, setWgStep] = useState(0);
  const [wgData, setWgData] = useState({
    gender: '',
    experience: '',
    unit: 'kg',
    weight: 70,
    parts: [],
    location: ''
  });
  const [wgPlan, setWgPlan] = useState(null);

  // Meal Plan Generator state
  const [mpData, setMpData] = useState({
    purpose: 'muscle',
    heightUnit: 'feet',
    weightUnit: 'lbs',
    heightFeet: '',
    heightInches: '',
    heightCm: '',
    weight: '',
    goalWeight: '',
    dietPeriod: '',
    dietType: 'anything',
    allergies: ''
  });
  const [mpResult, setMpResult] = useState(null);

  const tools = [
    {
      id: 'bmi',
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index to understand your weight category',
      icon: '📊'
    },
    {
      id: 'calorie',
      name: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs based on your goals',
      icon: '🔥'
    },
    {
      id: 'timer',
      name: 'Workout Timer',
      description: 'Set up custom timers for your workout intervals',
      icon: '⏱️'
    },
    {
      id: 'onerepmax',
      name: 'One Rep Max Calculator',
      description: 'Calculate your one rep max from any weight and rep combination',
      icon: '💪'
    }
  ];

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height);
    
    if (weight && height) {
      let bmi;
      if (bmiData.unit === 'metric') {
        bmi = weight / Math.pow(height / 100, 2);
      } else {
        bmi = (weight * 703) / Math.pow(height, 2);
      }
      
      let category;
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiResult({ bmi: bmi.toFixed(1), category });
    }
  };

  const calculateCalories = () => {
    const { age, weight, height, gender, activity, goal } = calorieData;
    
    if (age && weight && height) {
      // BMR calculation using Mifflin-St Jeor Equation
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      // Activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      let tdee = bmr * activityMultipliers[activity];
      
      // Goal adjustment
      const goalAdjustments = {
        lose: -500,
        maintain: 0,
        gain: 500
      };
      
      const dailyCalories = tdee + goalAdjustments[goal];
      
      setCalorieResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        dailyCalories: Math.round(dailyCalories)
      });
    }
  };

  const startTimer = () => {
    const totalSeconds = parseInt(timerData.minutes) * 60 + parseInt(timerData.seconds);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsTimerRunning(true);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  React.useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const calculateOneRepMax = () => {
    const weight = parseFloat(oneRepMaxData.weight);
    const reps = parseFloat(oneRepMaxData.reps);
    
    if (weight && reps) {
      // Using Epley formula
      const oneRepMax = weight * (1 + reps / 30);
      setOneRepMaxResult(Math.round(oneRepMax));
    }
  };

  const togglePart = (part) => {
    setWgData(prev => {
      const exists = prev.parts.includes(part);
      const parts = exists ? prev.parts.filter(p => p !== part) : [...prev.parts, part];
      return { ...prev, parts };
    });
  };

  const generateWorkoutPlan = () => {
    // Simple client-side mock plan generator
    const library = {
      Back: ['Pull-ups', 'Lat Pulldown', 'Barbell Row'],
      Chest: ['Bench Press', 'Incline Dumbbell Press', 'Push-ups'],
      Shoulder: ['Overhead Press', 'Lateral Raise', 'Face Pull'],
      Leg: ['Squats', 'Lunges', 'Leg Press'],
      Core: ['Plank', 'Hanging Knee Raise', 'Cable Crunch'],
      Triceps: ['Triceps Pushdown', 'Skull Crushers', 'Dips'],
      Biceps: ['Barbell Curl', 'Hammer Curl', 'Chin-ups'],
      'Fore arms': ['Wrist Curl', 'Reverse Curl', 'Farmer Walk']
    };
    const intensityByExperience = {
      Introductory: 2,
      Beginner: 2,
      Intermediate: 3,
      Advanced: 4,
      Expert: 5
    };
    const sets = intensityByExperience[wgData.experience] || 3;
    const plan = (wgData.parts.length ? wgData.parts : ['Full Body']).map(part => {
      const list = library[part] || ['Bodyweight Squat', 'Push-up', 'Row'];
      return {
        part,
        exercises: list.slice(0, 3).map(name => ({ name, sets, reps: 12 }))
      };
    });
    setWgPlan({
      meta: { gender: wgData.gender, experience: wgData.experience, location: wgData.location },
      plan
    });
    setWgStep(6);
  };

  const generateMealPlan = () => {
    // Mock meal plan generation
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    
    const mealLibrary = {
      muscle: {
        Breakfast: ['Scrambled eggs (200g), Whole grain toast (100g), Avocado (50g)', 'Protein pancakes (150g), Greek yogurt (100g), Berries (50g)', 'Oatmeal (100g), Protein powder (30g), Banana (100g)'],
        Lunch: ['Grilled chicken breast (200g), Quinoa (150g), Steamed broccoli (100g)', 'Salmon fillet (200g), Sweet potato (200g), Green beans (100g)', 'Turkey wrap (200g), Brown rice (150g), Mixed vegetables (100g)'],
        Dinner: ['Beef stir-fry (200g), Brown rice (150g), Mixed vegetables (100g)', 'Baked cod (200g), Roasted potatoes (150g), Asparagus (100g)', 'Grilled steak (200g), Wild rice (150g), Spinach salad (100g)'],
        Snack: ['Greek yogurt (150g), Almonds (30g)', 'Protein shake (250ml), Apple (150g)', 'Cottage cheese (150g), Walnuts (20g)']
      },
      tone: {
        Breakfast: ['Greek yogurt parfait (200g), Granola (50g), Berries (50g)', 'Avocado toast (100g), Poached egg (50g), Spinach (30g)', 'Smoothie bowl (250g), Chia seeds (20g), Coconut flakes (10g)'],
        Lunch: ['Quinoa salad (200g), Grilled vegetables (150g), Feta cheese (50g)', 'Lentil soup (300g), Whole grain bread (100g), Mixed greens (50g)', 'Chickpea curry (250g), Brown rice (100g), Cucumber salad (100g)'],
        Dinner: ['Baked salmon (150g), Roasted vegetables (200g), Quinoa (100g)', 'Grilled tofu (150g), Stir-fried vegetables (200g), Brown rice (100g)', 'Turkey meatballs (150g), Zucchini noodles (200g), Marinara sauce (100g)'],
        Snack: ['Apple slices (150g), Almond butter (20g)', 'Hummus (50g), Carrot sticks (100g)', 'Trail mix (30g), Green tea']
      },
      lose: {
        Breakfast: ['Oatmeal (80g), Berries (50g), Almond milk (200ml)', 'Greek yogurt (150g), Chia seeds (20g), Honey (10g)', 'Green smoothie (300ml), Spinach (50g), Banana (100g)'],
        Lunch: ['Grilled chicken salad (200g), Mixed greens (100g), Olive oil dressing (15ml)', 'Vegetable soup (300g), Whole grain crackers (50g)', 'Tuna salad (150g), Cucumber slices (100g), Lemon juice (10ml)'],
        Dinner: ['Baked fish (150g), Steamed vegetables (200g), Quinoa (100g)', 'Turkey chili (200g), Black beans (100g), Mixed vegetables (100g)', 'Grilled shrimp (150g), Zucchini noodles (200g), Garlic (10g)'],
        Snack: ['Celery sticks (100g), Peanut butter (15g)', 'Hard-boiled egg (50g), Cherry tomatoes (100g)', 'Cottage cheese (100g), Cucumber slices (50g)']
      }
    };

    const purposeKey = mpData.purpose === 'muscle' ? 'muscle' : mpData.purpose === 'tone' ? 'tone' : 'lose';
    const selectedMeals = mealLibrary[purposeKey];
    
    const weeklyPlan = days.map(day => ({
      day,
      meals: meals.map(meal => ({
        meal,
        description: selectedMeals[meal][Math.floor(Math.random() * selectedMeals[meal].length)]
      }))
    }));

    // Calculate daily nutrition (mock values)
    const nutritionValues = {
      muscle: { calories: 2500, protein: 180, carbs: 300, fat: 80 },
      tone: { calories: 2000, protein: 120, carbs: 250, fat: 70 },
      lose: { calories: 1500, protein: 100, carbs: 150, fat: 50 }
    };

    setMpResult({
      plan: weeklyPlan,
      nutrition: nutritionValues[purposeKey],
      meta: mpData
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderBMICalculator = () => (
    <div className="tool-content">
      <h3>BMI Calculator</h3>
      <p>Calculate your Body Mass Index to understand your weight category.</p>
      
      <div className="form-group">
        <label>Unit System</label>
        <select 
          value={bmiData.unit} 
          onChange={(e) => setBmiData({...bmiData, unit: e.target.value})}
        >
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Weight ({bmiData.unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input
            type="number"
            value={bmiData.weight}
            onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
            placeholder="Enter weight"
          />
        </div>
        <div className="form-group">
          <label>Height ({bmiData.unit === 'metric' ? 'cm' : 'inches'})</label>
          <input
            type="number"
            value={bmiData.height}
            onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
            placeholder="Enter height"
          />
        </div>
      </div>
      
      <button className="calculate-btn" onClick={calculateBMI}>
        Calculate BMI
      </button>
      
      {bmiResult && (
        <div className="result-card">
          <h4>Your BMI Result</h4>
          <div className="result-value">{bmiResult.bmi}</div>
          <div className="result-category">{bmiResult.category}</div>
        </div>
      )}
    </div>
  );

  const renderCalorieCalculator = () => (
    <div className="tool-content">
      <h3>Calorie Calculator</h3>
      <p>Calculate your daily calorie needs based on your goals and activity level.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={calorieData.age}
            onChange={(e) => setCalorieData({...calorieData, age: e.target.value})}
            placeholder="Enter age"
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select 
            value={calorieData.gender} 
            onChange={(e) => setCalorieData({...calorieData, gender: e.target.value})}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={calorieData.weight}
            onChange={(e) => setCalorieData({...calorieData, weight: e.target.value})}
            placeholder="Enter weight"
          />
        </div>
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={calorieData.height}
            onChange={(e) => setCalorieData({...calorieData, height: e.target.value})}
            placeholder="Enter height"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Activity Level</label>
          <select 
            value={calorieData.activity} 
            onChange={(e) => setCalorieData({...calorieData, activity: e.target.value})}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="active">Very active (hard exercise 6-7 days/week)</option>
            <option value="veryActive">Extra active (very hard exercise, physical job)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Goal</label>
          <select 
            value={calorieData.goal} 
            onChange={(e) => setCalorieData({...calorieData, goal: e.target.value})}
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
      </div>
      
      <button className="calculate-btn" onClick={calculateCalories}>
        Calculate Calories
      </button>
      
      {calorieResult && (
        <div className="result-card">
          <h4>Your Calorie Results</h4>
          <div className="result-item">
            <span>BMR (Basal Metabolic Rate):</span>
            <span>{calorieResult.bmr} calories/day</span>
          </div>
          <div className="result-item">
            <span>TDEE (Total Daily Energy Expenditure):</span>
            <span>{calorieResult.tdee} calories/day</span>
          </div>
          <div className="result-item">
            <span>Daily Calorie Target:</span>
            <span>{calorieResult.dailyCalories} calories/day</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderWorkoutTimer = () => (
    <div className="tool-content">
      <h3>Workout Timer</h3>
      <p>Set up custom timers for your workout intervals and rest periods.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label>Minutes</label>
          <input
            type="number"
            value={timerData.minutes}
            onChange={(e) => setTimerData({...timerData, minutes: e.target.value})}
            placeholder="0"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Seconds</label>
          <input
            type="number"
            value={timerData.seconds}
            onChange={(e) => setTimerData({...timerData, seconds: e.target.value})}
            placeholder="0"
            min="0"
            max="59"
          />
        </div>
      </div>
      
      <div className="timer-controls">
        {!isTimerRunning ? (
          <button className="start-btn" onClick={startTimer}>
            Start Timer
          </button>
        ) : (
          <div className="timer-buttons">
            <button className="pause-btn" onClick={pauseTimer}>
              Pause
            </button>
            <button className="stop-btn" onClick={stopTimer}>
              Stop
            </button>
          </div>
        )}
      </div>
      
      {timeLeft > 0 && (
        <div className="timer-display">
          <div className="timer-value">{formatTime(timeLeft)}</div>
          {isTimerRunning && <div className="timer-status">Running...</div>}
        </div>
      )}
    </div>
  );

  const renderOneRepMaxCalculator = () => (
    <div className="tool-content">
      <h3>One Rep Max Calculator</h3>
      <p>Calculate your one rep max from any weight and rep combination using the Epley formula.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label>Weight (lbs)</label>
          <input
            type="number"
            value={oneRepMaxData.weight}
            onChange={(e) => setOneRepMaxData({...oneRepMaxData, weight: e.target.value})}
            placeholder="Enter weight"
          />
        </div>
        <div className="form-group">
          <label>Reps</label>
          <input
            type="number"
            value={oneRepMaxData.reps}
            onChange={(e) => setOneRepMaxData({...oneRepMaxData, reps: e.target.value})}
            placeholder="Enter reps"
            min="1"
            max="10"
          />
        </div>
      </div>
      
      <button className="calculate-btn" onClick={calculateOneRepMax}>
        Calculate One Rep Max
      </button>
      
      {oneRepMaxResult && (
        <div className="result-card">
          <h4>Your One Rep Max</h4>
          <div className="result-value">{oneRepMaxResult} lbs</div>
        </div>
      )}
    </div>
  );

  const renderWorkoutGenerator = () => {
    const totalSteps = 6; // start, gender, experience, weight, parts, location -> results separate
    const StepWrapper = ({ children }) => (
      <div className="wg-wrapper">
        <div className="wg-progress"><div className="wg-bar" style={{ width: `${Math.min(wgStep, totalSteps) / totalSteps * 100}%` }} /></div>
        {children}
      </div>
    );

    if (wgStep === 0) {
      return (
        <StepWrapper>
          <h2 className="wg-title">Free AI Workout Generator</h2>
          <p className="wg-sub">Get personalized workouts with an AI generator in a minute.</p>
          <button className="wg-primary" onClick={() => setWgStep(1)}>Start for free</button>
        </StepWrapper>
      );
    }

    if (wgStep === 1) {
      return (
        <StepWrapper>
          <h2 className="wg-title">What is your gender?</h2>
          <p className="wg-sub">Used for generating routines, won't be shared.</p>
          {['Male', 'Female', 'Other'].map(opt => (
            <button key={opt} className="wg-option" onClick={() => { setWgData({ ...wgData, gender: opt }); setWgStep(2); }}>{opt}</button>
          ))}
        </StepWrapper>
      );
    }

    if (wgStep === 2) {
      const options = ['Introductory', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
      return (
        <StepWrapper>
          <h2 className="wg-title">How experienced are you?</h2>
          <p className="wg-sub">Used for generating routines, won't be shared.</p>
          {options.map(opt => (
            <button key={opt} className="wg-option" onClick={() => { setWgData({ ...wgData, experience: opt }); setWgStep(3); }}>{opt}
              <div className="wg-small">{opt === 'Introductory' ? 'Has no experience' : opt === 'Beginner' ? "Don't know what routine to follow" : opt === 'Intermediate' ? 'Has my own workout routines' : opt === 'Advanced' ? 'Skilled enough to be a trainer' : 'Experienced enough to be an athlete'}</div>
            </button>
          ))}
        </StepWrapper>
      );
    }

    if (wgStep === 3) {
      return (
        <StepWrapper>
          <h2 className="wg-title">How much do you weigh?</h2>
          <p className="wg-sub">Used for generating routines, won't be shared.</p>
          <div className="wg-toggle">
            <button className={`wg-toggle-btn ${wgData.unit === 'kg' ? 'active' : ''}`} onClick={() => setWgData({ ...wgData, unit: 'kg' })}>kg</button>
            <button className={`wg-toggle-btn ${wgData.unit === 'lbs' ? 'active' : ''}`} onClick={() => setWgData({ ...wgData, unit: 'lbs' })}>lbs</button>
          </div>
          <div className="wg-input">
            <input type="number" value={wgData.weight} onChange={(e) => setWgData({ ...wgData, weight: Number(e.target.value) })} />
            <span>{wgData.unit}</span>
          </div>
          <button className="wg-primary" onClick={() => setWgStep(4)}>Next</button>
        </StepWrapper>
      );
    }

    if (wgStep === 4) {
      const parts = ['Back', 'Chest', 'Shoulder', 'Leg', 'Core', 'Triceps', 'Biceps', 'Fore arms'];
      return (
        <StepWrapper>
          <h2 className="wg-title">Which part would you like to work out today?</h2>
          <p className="wg-sub">Routines targeting the chosen parts will be generated</p>
          {parts.map(p => (
            <button key={p} className={`wg-option ${wgData.parts.includes(p) ? 'selected' : ''}`} onClick={() => togglePart(p)}>{p}</button>
          ))}
          <button className="wg-primary" onClick={() => setWgStep(5)}>Next</button>
        </StepWrapper>
      );
    }

    if (wgStep === 5) {
      return (
        <StepWrapper>
          <h2 className="wg-title">Where do you work out?</h2>
          <p className="wg-sub">Routines will be generated based on where you work out</p>
          {['Gym', 'Home (Bodyweight)'].map(loc => (
            <button key={loc} className="wg-option" onClick={() => setWgData({ ...wgData, location: loc })}>{loc}</button>
          ))}
          <button className="wg-primary" onClick={generateWorkoutPlan}>Get Routines</button>
        </StepWrapper>
      );
    }

    // Results
    return (
      <StepWrapper>
        <h2 className="wg-title">Your Workout Plan</h2>
        {!wgPlan ? (
          <p>No plan generated.</p>
        ) : (
          <div className="wg-results">
            {wgPlan.plan.map(section => (
              <div key={section.part} className="wg-card">
                <h4>{section.part}</h4>
                {section.exercises.map((ex, idx) => (
                  <div key={idx} className="wg-ex">
                    <span>{ex.name}</span>
                    <span>{ex.sets} x {ex.reps}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="wg-actions">
          <button className="wg-secondary" onClick={() => { setWgStep(1); setWgPlan(null); }}>Start Over</button>
        </div>
      </StepWrapper>
    );
  };

  const renderMealPlanGenerator = () => {
    if (mpResult) {
      return (
        <div className="mp-results">
          <h2 className="mp-title">Weekly Diet Plan</h2>
          <div className="mp-table-container">
            <table className="mp-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Meal</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {mpResult.plan.map((dayData, dayIndex) => 
                  dayData.meals.map((mealData, mealIndex) => (
                    <tr key={`${dayIndex}-${mealIndex}`}>
                      {mealIndex === 0 && <td rowSpan={4}>{dayData.day}</td>}
                      <td>{mealData.meal}</td>
                      <td>{mealData.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mp-nutrition">
            <h3>Daily Nutrition</h3>
            <div className="mp-nutrition-grid">
              <div className="mp-nutrition-item">
                <span className="mp-nutrition-icon">🔥</span>
                <span className="mp-nutrition-label">Total Calories</span>
                <span className="mp-nutrition-value">{mpResult.nutrition.calories} kcal</span>
              </div>
              <div className="mp-nutrition-item">
                <span className="mp-nutrition-icon">🥩</span>
                <span className="mp-nutrition-label">Protein</span>
                <span className="mp-nutrition-value">{mpResult.nutrition.protein} g</span>
              </div>
              <div className="mp-nutrition-item">
                <span className="mp-nutrition-icon">🍞</span>
                <span className="mp-nutrition-label">Carbohydrates</span>
                <span className="mp-nutrition-value">{mpResult.nutrition.carbs} g</span>
              </div>
              <div className="mp-nutrition-item">
                <span className="mp-nutrition-icon">🥑</span>
                <span className="mp-nutrition-label">Fat</span>
                <span className="mp-nutrition-value">{mpResult.nutrition.fat} g</span>
              </div>
            </div>
          </div>
          
          <button className="mp-generate-btn" onClick={() => setMpResult(null)}>
            Generate New Plan
          </button>
        </div>
      );
    }

    return (
      <div className="mp-form">
        <h2 className="mp-title">Free AI Meal Plan Generator 2024</h2>
        <p className="mp-description">
          A free AI meal planner that generates weekly meal plans tailored to you, whether you're vegan/vegetarian, or not. 
          Get inspired with new meal prep and plan ideas designed to support your fitness goals.
        </p>
        
        <div className="mp-section">
          <h3>Purpose of the diet</h3>
          <div className="mp-options">
            <button 
              className={`mp-option ${mpData.purpose === 'muscle' ? 'selected' : ''}`}
              onClick={() => setMpData({...mpData, purpose: 'muscle'})}
            >
              💪 Muscle Gain
            </button>
            <button 
              className={`mp-option ${mpData.purpose === 'tone' ? 'selected' : ''}`}
              onClick={() => setMpData({...mpData, purpose: 'tone'})}
            >
              ✨ Stay Toned
            </button>
            <button 
              className={`mp-option ${mpData.purpose === 'lose' ? 'selected' : ''}`}
              onClick={() => setMpData({...mpData, purpose: 'lose'})}
            >
              🔥 Lose Weight
            </button>
          </div>
        </div>

        <div className="mp-section">
          <h3>Body information</h3>
          <div className="mp-units">
            <div className="mp-unit-group">
              <span>Height:</span>
              <button 
                className={`mp-unit-btn ${mpData.heightUnit === 'cm' ? 'selected' : ''}`}
                onClick={() => setMpData({...mpData, heightUnit: 'cm'})}
              >
                cm
              </button>
              <button 
                className={`mp-unit-btn ${mpData.heightUnit === 'feet' ? 'selected' : ''}`}
                onClick={() => setMpData({...mpData, heightUnit: 'feet'})}
              >
                feet
              </button>
            </div>
            <div className="mp-unit-group">
              <span>Weight:</span>
              <button 
                className={`mp-unit-btn ${mpData.weightUnit === 'kg' ? 'selected' : ''}`}
                onClick={() => setMpData({...mpData, weightUnit: 'kg'})}
              >
                kg
              </button>
              <button 
                className={`mp-unit-btn ${mpData.weightUnit === 'lbs' ? 'selected' : ''}`}
                onClick={() => setMpData({...mpData, weightUnit: 'lbs'})}
              >
                lbs
              </button>
            </div>
          </div>
          
          <div className="mp-input-group">
            <label>Height</label>
            {mpData.heightUnit === 'feet' ? (
              <div className="mp-height-inputs">
                <input 
                  type="number" 
                  placeholder="5" 
                  value={mpData.heightFeet}
                  onChange={(e) => setMpData({...mpData, heightFeet: e.target.value})}
                />
                <span>feet</span>
                <input 
                  type="number" 
                  placeholder="10" 
                  value={mpData.heightInches}
                  onChange={(e) => setMpData({...mpData, heightInches: e.target.value})}
                />
                <span>inch</span>
              </div>
            ) : (
              <input 
                type="number" 
                placeholder="170" 
                value={mpData.heightCm}
                onChange={(e) => setMpData({...mpData, heightCm: e.target.value})}
              />
            )}
          </div>
          
          <div className="mp-input-group">
            <label>Weight</label>
            <input 
              type="number" 
              placeholder="70" 
              value={mpData.weight}
              onChange={(e) => setMpData({...mpData, weight: e.target.value})}
            />
          </div>
        </div>

        <div className="mp-section">
          <h3>Goal weight</h3>
          <div className="mp-input-group">
            <input 
              type="number" 
              placeholder="65" 
              value={mpData.goalWeight}
              onChange={(e) => setMpData({...mpData, goalWeight: e.target.value})}
            />
          </div>
        </div>

        <div className="mp-section">
          <h3>Diet period</h3>
          <div className="mp-input-group">
            <input 
              type="number" 
              placeholder="4" 
              value={mpData.dietPeriod}
              onChange={(e) => setMpData({...mpData, dietPeriod: e.target.value})}
            />
            <span>weeks</span>
          </div>
        </div>

        <div className="mp-section">
          <h3>Types of vegan diets</h3>
          <div className="mp-diet-types">
            {['🌱 Vegan', '🥛 Lacto-Vegetarian', '🥚 Ovo-Vegetarian', '🥛🥚 Lacto-Ovo-Vegetarian', '🐟 Pescatarian', '🍗 Pollo-Vegetarian'].map(diet => (
              <button 
                key={diet}
                className={`mp-diet-btn ${mpData.dietType === diet.toLowerCase().replace(/[^a-z]/g, '') ? 'selected' : ''}`}
                onClick={() => setMpData({...mpData, dietType: diet.toLowerCase().replace(/[^a-z]/g, '')})}
              >
                {diet}
              </button>
            ))}
            <button 
              className={`mp-diet-btn mp-diet-anything ${mpData.dietType === 'anything' ? 'selected' : ''}`}
              onClick={() => setMpData({...mpData, dietType: 'anything'})}
            >
              Anything
            </button>
          </div>
        </div>

        <div className="mp-section">
          <h3>Please tell me all the foods you are allergic to</h3>
          <div className="mp-input-group">
            <input 
              type="text" 
              placeholder="ex) Milk, Nuts, Eggs" 
              value={mpData.allergies}
              onChange={(e) => setMpData({...mpData, allergies: e.target.value})}
            />
          </div>
        </div>

        <button className="mp-generate-btn" onClick={generateMealPlan}>
          Generate Meal Plan By AI
        </button>
      </div>
    );
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'bmi':
        return renderBMICalculator();
      case 'calorie':
        return renderCalorieCalculator();
      case 'timer':
        return renderWorkoutTimer();
      case 'onerepmax':
        return renderOneRepMaxCalculator();
      case 'workoutgen':
        return (
          <PremiumFeature 
            feature="AI Workout Generator"
            preview={
              <div>
                <p>Get personalized workout plans tailored to your fitness level, goals, and available equipment.</p>
                <p>Premium features include:</p>
                <ul>
                  <li>Advanced AI personalization</li>
                  <li>Progress tracking</li>
                  <li>Video exercise tutorials</li>
                  <li>Custom workout scheduling</li>
                </ul>
              </div>
            }
          >
            {renderWorkoutGenerator()}
          </PremiumFeature>
        );
      case 'mealplan':
        return (
          <PremiumFeature 
            feature="AI Meal Plan Generator"
            preview={
              <div>
                <p>Get personalized meal plans with detailed recipes and macro tracking.</p>
                <p>Premium features include:</p>
                <ul>
                  <li>Custom macro calculations</li>
                  <li>Recipe variations</li>
                  <li>Shopping list generation</li>
                  <li>Nutrition tracking</li>
                </ul>
              </div>
            }
          >
            {renderMealPlanGenerator()}
          </PremiumFeature>
        );
      default:
        return (
          <div className="tool-content">
            <h3>Select a Tool</h3>
            <p>Choose a tool from the sidebar to get started with your fitness calculations.</p>
          </div>
        );
    }
  };

  return (
    <div className="tools-page">
      <SharedHeader />
      
      <div className="tools-header">
        <h1>Fitness Tools</h1>
        <p>Essential calculators and tools to help you achieve your fitness goals</p>
      </div>

      <div className="tools-container">
        <div className="tools-main">
          <div className="quick-actions">
            <button className={`quick-btn ${activeTool === 'bmi' ? 'active' : ''}`} onClick={() => setActiveTool('bmi')}>
              📊 BMI Calculator
            </button>
            <button className={`quick-btn ${activeTool === 'calorie' ? 'active' : ''}`} onClick={() => setActiveTool('calorie')}>
              🔥 Calorie Calculator
            </button>
            <button className={`quick-btn ${activeTool === 'timer' ? 'active' : ''}`} onClick={() => setActiveTool('timer')}>
              ⏱️ Workout Timer
            </button>
            <button className={`quick-btn ${activeTool === 'onerepmax' ? 'active' : ''}`} onClick={() => setActiveTool('onerepmax')}>
              💪 One Rep Max
            </button>
            <button className={`quick-btn ${activeTool === 'workoutgen' ? 'active' : ''}`} onClick={() => setActiveTool('workoutgen')}>
              🤖 AI Workout Generator
              {!isPremium() && <span className="premium-tag">Premium</span>}
            </button>
            <button className={`quick-btn ${activeTool === 'mealplan' ? 'active' : ''}`} onClick={() => setActiveTool('mealplan')}>
              🍽️ AI Meal Plan Generator
              {!isPremium() && <span className="premium-tag">Premium</span>}
            </button>
          </div>
          {renderToolContent()}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage; 