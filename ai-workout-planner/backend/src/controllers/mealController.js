let meals = [];
let nextId = 1;

exports.getAllMeals = (req, res) => {
  res.json(meals);
};

exports.addMeal = (req, res) => {
  const { name, calories } = req.body;
  if (!name || typeof calories !== 'number') {
    return res.status(400).json({ message: 'Name and calories required' });
  }
  const meal = { id: nextId++, name, calories };
  meals.push(meal);
  res.status(201).json(meal);
};

exports.getMealById = (req, res) => {
  const meal = meals.find(m => m.id === parseInt(req.params.id));
  if (!meal) {
    return res.status(404).json({ message: 'Meal not found' });
  }
  res.json(meal);
}; 