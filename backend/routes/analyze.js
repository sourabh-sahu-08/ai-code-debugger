const express = require('express');
const router = express.Router();
const {
  analyzeCode,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
  togglePublic,
  addComment,
  deleteComment,
  chatWithAI,
  getPublicAnalysis
} = require('../controllers/analyze');
const { protect } = require('../middleware/auth');

router.post('/', protect, analyzeCode);
router.get('/history', protect, getHistory);
router.get('/public/:id', getPublicAnalysis);

router.route('/:id')
  .get(protect, getAnalysisById)
  .delete(protect, deleteAnalysis);

router.put('/:id/toggle-public', protect, togglePublic);
router.post('/:id/chat', protect, chatWithAI);

router.route('/:id/comment')
  .post(protect, addComment);

router.route('/:id/comment/:commentId')
  .delete(protect, deleteComment);

module.exports = router;
