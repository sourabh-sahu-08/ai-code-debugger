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

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }
  if (project.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized to delete this project' });
  }
  await project.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
