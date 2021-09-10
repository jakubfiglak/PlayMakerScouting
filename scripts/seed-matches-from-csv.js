const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Match = require('../modules/matches/match.model');
const Club = require('../modules/clubs/club.model');

dotenv.config({ path: './config/config.env' });

const prodAdminId = '6047f176c5d45231a400ef89';
const devAdminId = '5d7a514b5d2c12c7449be042';

const results = [];

async function seedMatches() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2021-09-07-matches.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const matches = results.map((result) => ({
        homeTeam: result.homeTeam,
        awayTeam: result.awayTeam,
        author: result.author || prodAdminId,
        competition: result.competition,
        date: result.date,
        result: result.result,
        videoURL: result.videoURL,
        isPublic: false,
        isSeededFromPlaymakerDb: true,
      }));

      const created = await Match.create(matches);
      console.log(created);
      console.log(`Created ${created.length} matches!`.green.inverse);
      process.exit();
    });
}

seedMatches();
