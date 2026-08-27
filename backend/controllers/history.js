const asyncHandler = require('../middleware/asyncHandler');
const DebugSession = require('../models/DebugSession');

// @desc    Get all debug history for logged in user
// @route   GET /api/v1/history
// @access  Private
exports.getHistory = asyncHandler(async (req, res, next) => {
  const history = await DebugSession.find({ user: req.user.id })
    .populate('project', 'name')
    .sort('-createdAt');
  res.status(200).json({ success: true, count: history.length, data: history });
});

// @desc    Save a debug session
// @route   POST /api/v1/history
// @access  Private
exports.saveSession = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const session = await DebugSession.create(req.body);
  res.status(201).json({ success: true, data: session });
});
