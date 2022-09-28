const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

const prodAdminId = '6047f176c5d45231a400ef89';
// const devAdminId = '5d7a514b5d2c12c7449be042';

// const devDb = process.env.DB_CONNECT;
const prodDb = process.env.PRODUCTION_DB_CONNECT;

const results = [];

async function seedPlayers() {
  await connectDB(prodDb);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-08-24-players.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const players = results.map((result) => ({
        firstName: result.firstName || result.lastName,
        lastName: result.lastName,
        club: result.club,
        // club: '5ee5060ad784b010395a756e',
        country: result.country,
        position: result.position || 'CM',
        yearOfBirth: result.yearOfBirth || 2000,
        height: result.height,
        weight: result.weight,
        footed: result.footed || 'both',
        lnpID: result.lnpID,
        lnpProfileURL: result.lnpProfileURL,
        minut90ProfileURL: result.minut90ProfileURL,
        transfermarktProfileURL: result.transfermarktProfileURL,
        author: result.author || prodAdminId,
        isPublic: false,
        isSeededFromPlaymakerDb: true,
      }));

      const created = await Player.create(players);
      console.log(created);
      console.log(`Created ${created.length} players!`.green.inverse);
      process.exit();
    });
}

seedPlayers();
