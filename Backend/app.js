const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

const userRoutes = require('./models/users/usersroutes');
// ✅ Configure CORS for React frontend
app.use(cors());

//  Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Request logger (good for debugging)
app.use((req, res, next) => {
  console.log(`[📥 ${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Mount API routes
app.use('/api/users', userRoutes);

module.exports = app;
