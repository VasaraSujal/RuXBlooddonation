const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB } = require("../../config/db");
const { ObjectId } = require("mongodb");

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const users = db.collection("users");

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Create JWT token including isVerified field
    const token = jwt.sign(
      { id: user._id, isVerified: user.isVerified || false },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified || false,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
