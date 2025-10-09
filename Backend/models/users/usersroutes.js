const express = require('express');
const router = express.Router();
const { addFullUser, addEmergencyGuest} = require('./usersControllers');

// Full user signup
router.post('/add', addFullUser);

// Emergency guest signup
router.post('/emergency', addEmergencyGuest);

module.exports = router;
