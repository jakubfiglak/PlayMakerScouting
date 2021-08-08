const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('../config/db');
const User = require('../modules/users/user.model');
const AccessControlList = require('../modules/accessControlLists/accessControlList.model');

dotenv.config({ path: './config/config.env' });

const emails = [];

const getUsernameFromEmail = (email) => email.split('@')[0];

const users = emails.map((email) => ({
  firstName: getUsernameFromEmail(email),
  lastName: getUsernameFromEmail(email),
  email,
  password: `2021PM${getUsernameFromEmail(email)}`,
  role: 'scout',
  status: 'active',
}));

const seedUsers = async () => {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);
  try {
    const createdUsers = await User.create(users);
    console.log('Users created!'.green.inverse, createdUsers);
    const acls = createdUsers.map((user) => ({ user: user._id }));
    const createdAcls = await AccessControlList.create(acls);
    console.log('Acls created!'.green.inverse, createdAcls);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seedUsers();
