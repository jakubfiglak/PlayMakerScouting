const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const config = {
  mongodb: {
    url: process.env.DB_CONNECT,
    databaseName: process.env.NODE_ENV === 'development' ? 'test' : 'playmaker',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
};

module.exports = config;
