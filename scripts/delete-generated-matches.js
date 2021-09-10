const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Match = require('../modules/matches/match.model');

dotenv.config({ path: './config/config.env' });

async function deleteMatches() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  await Match.deleteMany({ isSeededFromPlaymakerDb: true });
  console.log('Matches removed!'.red.inverse);
  process.exit();
}

deleteMatches();
