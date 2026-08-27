const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc    Get logged in user's friends
// @route   GET /api/v1/friends
// @access  Private
exports.getFriends = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('friends', 'name username avatar level xp');
  res.status(200).json({ success: true, count: user.friends.length, data: user.friends });
});

// @desc    Search users to add
// @route   GET /api/v1/friends/search?q=username
// @access  Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.q;
  if (!query) return res.status(200).json({ success: true, data: [] });

  const users = await User.find({
    username: { $regex: query, $options: 'i' },
    _id: { $ne: req.user.id }
  }).select('name username avatar level').limit(10);

  res.status(200).json({ success: true, data: users });
});

// @desc    Send a friend request
// @route   POST /api/v1/friends/request/:id
// @access  Private
exports.sendRequest = asyncHandler(async (req, res, next) => {
  const userToFriend = await User.findById(req.params.id);
  if (!userToFriend) return res.status(404).json({ success: false, error: 'User not found' });

  // Check if already friends
  if (userToFriend.friends.includes(req.user.id)) {
    return res.status(400).json({ success: false, error: 'Already friends' });
  }

  // Check if request already sent
  const alreadySent = userToFriend.friendRequests.find(r => r.user.toString() === req.user.id);
  if (alreadySent) {
    return res.status(400).json({ success: false, error: 'Request already sent' });
  }

  userToFriend.friendRequests.push({ user: req.user.id, status: 'pending' });
  await userToFriend.save();

  res.status(200).json({ success: true, data: 'Friend request sent' });
});
