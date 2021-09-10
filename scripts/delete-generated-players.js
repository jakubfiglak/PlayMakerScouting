const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

async function deletePlayers() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  await Player.deleteMany({ isSeededFromPlaymakerDb: true });
  console.log('Players removed!'.red.inverse);
  process.exit();
}

deletePlayers();
