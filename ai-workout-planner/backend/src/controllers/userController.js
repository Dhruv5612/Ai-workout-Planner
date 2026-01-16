const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username firstName lastName fitnessLevel').limit(100);
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.getPublicProfile());
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.getPublicProfile());
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch current user', error: err.message });
  }
}; 