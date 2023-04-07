const express = require('express');
const router = express.Router();
const {
	getLogs,
	addLog,
	updateLog,
	deleteLog,
} = require('../controllers/loggerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getLogs);
router.post('/add', protect, addLog);
router.put('/update/:id', protect, updateLog);
router.delete('/delete/:id', protect, deleteLog);

module.exports = router;
