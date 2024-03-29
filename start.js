const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const errorHandler = require('./middleware/error');
// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const clubs = require('./routes/clubs');
const players = require('./routes/players');
const orders = require('./routes/orders');
const reports = require('./routes/reports');
const dashboard = require('./routes/dashboard');
const ratings = require('./routes/ratings');
const reportTemplates = require('./routes/reportTemplates');
const teams = require('./routes/teams');
const accessControlLists = require('./routes/accessControlLists');
const reportBackgroundImages = require('./routes/reportBackgroundImages');
const matches = require('./routes/matches');
const notes = require('./routes/notes');
const email = require('./routes/email');

const startServer = (port = process.env.PORT || 5000) => {
  const app = express();

  Sentry.init({
    dsn: process.env.SENTRY,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1,
  });

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

  // Sentry
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  // Mount routers
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/users', users);
  app.use('/api/v1/clubs', clubs);
  app.use('/api/v1/players', players);
  app.use('/api/v1/orders', orders);
  app.use('/api/v1/reports', reports);
  app.use('/api/v1/dashboard', dashboard);
  app.use('/api/v1/ratings', ratings);
  app.use('/api/v1/report-templates', reportTemplates);
  app.use('/api/v1/teams', teams);
  app.use('/api/v1/access-control-lists', accessControlLists);
  app.use('/api/v1/report-background-images', reportBackgroundImages);
  app.use('/api/v1/matches', matches);
  app.use('/api/v1/notes', notes);
  app.use('/api/v1/email', email);

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }

  app.use(Sentry.Handlers.errorHandler());

  app.use(errorHandler);
  const server = app.listen(
    port,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
  );

  return server;
};

module.exports = startServer;
