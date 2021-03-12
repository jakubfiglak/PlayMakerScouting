const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const User = require('../models/user.model');

dotenv.config({ path: './config/config.env' });

const emails = [];

const getUsernameFromEmail = (email) => email.split('@')[0];

const users = emails.map((email) => ({
  firstName: getUsernameFromEmail(email),
  lastName: getUsernameFromEmail(email),
  email,
  password: `2021PM${getUsernameFromEmail(email)}`,
  role: 'playmaker-scout',
  status: 'active',
}));

const seedUsers = async () => {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
  try {
    const created = await User.create(users);
    console.log(created);
    console.log('Users created!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seedUsers();
