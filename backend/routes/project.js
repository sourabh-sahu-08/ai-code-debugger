const express = require('express');
const { getProjects, createProject, deleteProject } = require('../controllers/project');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All project routes require auth

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .delete(deleteProject);

module.exports = router;
