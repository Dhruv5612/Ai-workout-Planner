let workouts = [];
let nextId = 1;

exports.getAllWorkouts = (req, res) => {
  res.json(workouts);
};

exports.addWorkout = (req, res) => {
  const { name, exercises } = req.body;
  if (!name || !Array.isArray(exercises)) {
    return res.status(400).json({ message: 'Name and exercises required' });
  }
  const workout = { id: nextId++, name, exercises };
  workouts.push(workout);
  res.status(201).json(workout);
};

exports.getWorkoutById = (req, res) => {
  const workout = workouts.find(w => w.id === parseInt(req.params.id));
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json(workout);
}; 