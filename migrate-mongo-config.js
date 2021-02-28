const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const config = {
  mongodb: {
    url: process.env.DB_CONNECT,
    databaseName: 'test',
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
