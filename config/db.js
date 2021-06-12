const mongoose = require('mongoose');

const connectDB = async (connectionString = process.env.DB_CONNECT) => {
  const connection = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
