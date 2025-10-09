const { getDB } = require("../../config/db");

// Utility function: Calculate distance (in km) between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

// 🩸 Find Nearby Donors Controller (Search Only)
const findNearbyDonors = async (req, res) => {
  try {
    const db = getDB();
    const { latitude, longitude, bloodGroup, distance } = req.body;

    if (!latitude || !longitude || !bloodGroup) {
      return res.status(400).json({
        message: "Latitude, longitude, and blood group are required",
      });
    }

    const maxDistance = (distance || 10) * 1000; // convert km → meters

    const donors = await db.collection("users").find({
      bloodGroup,
      isVerified: true,
      isGuest: false,
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat]
          },
          $maxDistance: maxDistance,
        },
      },
    })
    .project({
      fullName: 1,
      bloodGroup: 1,
      city: 1,
      age: 1,
      coordinates: 1, // needed for distance calculation
    })
    .toArray();

    if (!donors.length) {
      return res.status(404).json({ message: "No donors found nearby" });
    }

    const donorsMinimal = donors.map((donor) => {
      const donorLat = donor.coordinates.coordinates[1];
      const donorLng = donor.coordinates.coordinates[0];
      const dist = calculateDistance(latitude, longitude, donorLat, donorLng);

      return {
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
        age: donor.age,
        distanceFromYou: `${dist.toFixed(2)} km`,
      };
    });

    res.status(200).json({
      count: donorsMinimal.length,
      donors: donorsMinimal,
    });

  } catch (error) {
    console.error("Error finding donors:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { findNearbyDonors };
