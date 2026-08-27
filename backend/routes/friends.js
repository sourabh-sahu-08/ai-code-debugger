const express = require('express');
const { getFriends, searchUsers, sendRequest } = require('../controllers/friends');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getFriends);
router.get('/search', searchUsers);
router.post('/request/:id', sendRequest);

module.exports = router;
