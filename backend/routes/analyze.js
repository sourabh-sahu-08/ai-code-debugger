const express = require('express');
const { analyzeCode } = require('../controllers/analyze');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, analyzeCode);

module.exports = router;
