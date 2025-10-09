const bcrypt = require('bcryptjs');
const { getDB } = require('../../config/db');
const { ObjectId } = require('mongodb');
// Add a new full user
const addFullUser = async (req, res) => {
  try {
    const db = getDB();
    const { 
      fullName, 
      email, 
      phone, 
      password, 
      age, 
      gender, 
      address,  
      coordinates, 
      bloodGroup, 
      city,
    } = req.body;

    if (!fullName || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }


    // Validate coordinates
    if (!coordinates || !coordinates.lat || !coordinates.long) {
      return res.status(400).json({ message: 'Invalid coordinates' });
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Use PATCH to update.' });
    }

    const userCoordinates = {
      type: "Point",
      coordinates: [parseFloat(coordinates.long), parseFloat(coordinates.lat)],
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      bloodGroup: bloodGroup || null,
      city: city || null,
      age: age || null,
      gender: gender || null,
      address: address || null,
      coordinates: userCoordinates,
      isGuest: false,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { addFullUser };