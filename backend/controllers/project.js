const asyncHandler = require('../middleware/asyncHandler');
const Project = require('../models/Project');

// @desc    Get all projects for logged in user
// @route   GET /api/v1/projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ user: req.user.id }).sort('-createdAt');
  res.status(200).json({ success: true, count: projects.length, data: projects });
});

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});
