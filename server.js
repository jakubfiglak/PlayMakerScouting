const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
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

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Mount routers
app.use(`${process.env.BASE_URL}/auth`, auth);
app.use(`${process.env.BASE_URL}/users`, users);
app.use(`${process.env.BASE_URL}/clubs`, clubs);
app.use(`${process.env.BASE_URL}/players`, players);
app.use(`${process.env.BASE_URL}/matches`, matches);
app.use(`${process.env.BASE_URL}/orders`, orders);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = server;
