const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const User = require('./models/User');
const Club = require('./models/Club');
const Player = require('./models/Player');

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const clubs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/clubs.json`, 'utf-8')
);

const players = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/players.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users);
    await Club.create(clubs);
    await Player.create(players);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Club.deleteMany();
    await Player.deleteMany();

    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-destroy') {
  deleteData();
}
