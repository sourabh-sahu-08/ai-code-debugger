const express = require('express');
const { getHistory, saveSession } = require('../controllers/history');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getHistory)
  .post(saveSession);

module.exports = router;
