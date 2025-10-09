const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

const userRoutes = require('./modules/users/usersroutes');
const donorRoutes = require('./modules/finddonor/donorroutes');
const authRoutes = require('./modules/auth/authRoutes');
const requestRoutes = require('./modules/requests/requestRoutes');
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
app.use('/api/donors', donorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

module.exports = app;
