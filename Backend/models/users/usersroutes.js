const express = require('express');
const router = express.Router();
const { addFullUser} = require('./usersControllers');

// Full user signup
router.post('/add', addFullUser);

module.exports = router;
