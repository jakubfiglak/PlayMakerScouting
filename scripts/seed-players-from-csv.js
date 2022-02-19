const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

const prodAdminId = '6047f176c5d45231a400ef89';
const devAdminId = '5d7a514b5d2c12c7449be042';
const devClubId = '5fdf6191eab8b362dc4b089a';

const results = [];

async function seedPlayers() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-02-19-players.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const players = results.map(({ _id, ...rest }) => ({
        ...rest,
        country: 'PL',
        position: rest.position || 'CM',
        footed: rest.footed || 'R',
        isSeededFromPlaymakerDb: true,
        isPublic: false,
        createdByUserWithRole: 'admin',
        firstName: rest.firstName || 'Imię',
        // Dev overwrites
        author: rest.author || prodAdminId,
      }));

      const created = await Player.create(players);
      console.log(`Created ${created.length} players!`.green.inverse);
      process.exit();
    });
}

seedPlayers();
