const testConfig = {
  mongodb: {
    url: 'mongodb://127.0.0.1:27017',
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

module.exports = testConfig;
