const express = require('express');
const router = express.Router();
const { addFullUser, addEmergencyGuest , completeGuestProfile} = require('./usersControllers');

// Full user signup
router.post('/add', addFullUser);

// Emergency guest signup
router.post('/emergency', addEmergencyGuest);

router.patch('/update/:id', completeGuestProfile);

module.exports = router;
