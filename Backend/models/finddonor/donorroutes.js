const express = require("express");
const { findNearbyDonors } = require("./donorControllers");

const router = express.Router();

// POST → Find Nearby Donors
router.post("/nearby", findNearbyDonors);

module.exports = router;
