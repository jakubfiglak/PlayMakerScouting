const mongoose = require('mongoose');

const setupTestDB = () => {
  beforeAll(async () => {
    const connection = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
    );
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
