const express = require("express");
const router = express.Router();
const { getLogs, addLog } = require("../controllers/loggerController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getLogs);
router.post("/add", protect, addLog);

module.exports = router;
