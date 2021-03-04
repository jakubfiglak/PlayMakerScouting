const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Configure dotenv to load environment variables
dotenv.config({
  path: './config/config.env',
});

// Set up a connection to the database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const clubs = require('./routes/clubs');
const players = require('./routes/players');
const matches = require('./routes/matches');
const orders = require('./routes/orders');
const reports = require('./routes/reports');
const dashboard = require('./routes/dashboard');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Prevent XSS attacks
app.use(xss());

// Mount routers
app.use(`${process.env.BASE_URL}/auth`, auth);
app.use(`${process.env.BASE_URL}/users`, users);
app.use(`${process.env.BASE_URL}/clubs`, clubs);
app.use(`${process.env.BASE_URL}/players`, players);
app.use(`${process.env.BASE_URL}/matches`, matches);
app.use(`${process.env.BASE_URL}/orders`, orders);
app.use(`${process.env.BASE_URL}/reports`, reports);
app.use(`${process.env.BASE_URL}/dashboard`, dashboard);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = server;
