const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Club = require('../modules/clubs/club.model');

dotenv.config({ path: './config/config.env' });

const results = [];

async function seedClubs() {
  await connectDB(process.env.DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2021-08-05-clubs.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const clubs = results.map((result) => ({
        name: result.team_name,
        voivodeship: result.voiv,
        lnpID: result.team_id_lnp,
      }));

      await Promise.resolve('hello');
      console.log(clubs);
      process.exit();
      // console.log(results);
    });
}

seedClubs();
