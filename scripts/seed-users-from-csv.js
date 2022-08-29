const dotenv = require('dotenv');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const User = require('../modules/users/user.model');
const AccessControlList = require('../modules/accessControlLists/accessControlList.model');

dotenv.config({ path: './config/config.env' });

const results = [];

const seedUsers = async () => {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-03-23-users.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const users = results.map((result) => ({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        password: result.password,
        role: 'scout',
        status: 'active',
      }));

      // console.log(users);

      const createdUsers = await User.create(users);
      console.log('Users created!'.green.inverse, createdUsers);
      const acls = createdUsers.map((user) => ({ user: user._id }));
      const createdAcls = await AccessControlList.create(acls);
      console.log('Acls created!'.green.inverse, createdAcls);
      process.exit();
    });
};

seedUsers();
