const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Club = require('../modules/clubs/club.model');

dotenv.config({ path: './config/config.env' });

const prodAdminId = '6047f176c5d45231a400ef89';
const devAdminId = '5d7a514b5d2c12c7449be042';

const results = [];

async function seedClubs() {
  await connectDB(process.env.DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2021-08-07-clubs.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const clubs = results.map((result) => ({
        name: result.team_name,
        voivodeship: result.voiv,
        division: result.league,
        lnpID: result.team_id_lnp,
        author: devAdminId,
        isPublic: true,
      }));

      const created = await Club.create(clubs);
      console.log(created);
      console.log('Clubs created!'.green.inverse);
      process.exit();
    });
}

seedClubs();
