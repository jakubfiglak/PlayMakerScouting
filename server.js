const dotenv = require('dotenv');
const connectDB = require('./config/db');
const startServer = require('./start');

// Configure dotenv to load environment variables
dotenv.config({
  path: './config/config.env',
});

// Set up a connection to the database
connectDB();

startServer();
