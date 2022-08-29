const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

// const devDb = process.env.DB_CONNECT;
const prodDb = process.env.PRODUCTION_DB_CONNECT;

const results = [];

async function updatePlayersClub() {
  await connectDB(prodDb);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-08-24-update_players.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      async function update(playerId, clubId, transfermarktUrl) {
        const player = await Player.findById(playerId);
        player.club = clubId;
        player.transfermarktProfileURL = transfermarktUrl;
        await player.save();
        console.log(
          `Updated player ${player.firstName} ${player.lastName} with clubId ${clubId} & transfermarkt URL ${transfermarktUrl}`
            .green.inverse
        );
      }

      const promiseArr = results.map(({ _id: id, club, transfermarktProfileURL }) =>
        update(id, club, transfermarktProfileURL)
      );

      await Promise.all(promiseArr);

      process.exit();
    });
}

updatePlayersClub();
