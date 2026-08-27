const asyncHandler = require('../middleware/asyncHandler');
const aiService = require('../services/aiService');

// @desc    Analyze code using AI
// @route   POST /api/v1/analyze
// @access  Private
exports.analyzeCode = asyncHandler(async (req, res, next) => {
  const { code, language, mode } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: 'Please provide code to analyze' });
  }

  const analysis = await aiService.analyzeCode(code, language, mode);

  // TODO: Save this analysis to DebugSession history for the logged-in user

  res.status(200).json({
    success: true,
    data: analysis
  });
});
