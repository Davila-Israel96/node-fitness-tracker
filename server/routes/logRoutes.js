const express = require('express');
const router = express.Router();
const { getLogs, addLog } = require('../controllers/loggerController');

router.get('/', getLogs);
router.post('/add', addLog);

module.exports = router;
