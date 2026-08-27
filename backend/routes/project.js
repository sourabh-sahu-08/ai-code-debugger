const express = require('express');
const { getProjects, createProject } = require('../controllers/project');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All project routes require auth

router.route('/')
  .get(getProjects)
  .post(createProject);

module.exports = router;
