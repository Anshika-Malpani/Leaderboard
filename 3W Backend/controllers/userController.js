const User = require('../models/User');
const History = require('../models/History');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  res.json({ user, points });
};

exports.getHistory = async (req, res) => {
  const history = await History.find()
    .populate('userId', 'name')
    .sort({ createdAt: -1 }); 

  res.json(history);
};


exports.getLeaderboard = async (req, res) => {
  const leaderboard = await User.find().sort({ totalPoints: -1 });
  res.json(leaderboard);
};
