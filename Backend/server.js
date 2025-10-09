const app = require('./app');
const { connectDB } = require('./config/db');
require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT || 4500;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
});
