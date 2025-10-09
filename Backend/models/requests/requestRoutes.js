const express = require("express");
const router = express.Router();
const { sendRequest } = require("./requestController");
const { verifyToken } = require("../../middleware/authMiddleware");

// Route for sending a blood request
router.post("/send", verifyToken, sendRequest);

module.exports = router;
