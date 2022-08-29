const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

const results = [];

async function updatePlayersLnpId() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-04-12-update_player_lnpid.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      async function update(playerId, lnpID) {
        const player = await Player.findById(playerId);
        player.lnpID = lnpID;
        await player.save();
        console.log(
          `Updated player ${player.firstName} ${player.lastName} with lnpId ${lnpID}`.green.inverse
        );
      }

      const promiseArr = results.map((data) => update(data._id, data.lnpID));

      await Promise.all(promiseArr);

      process.exit();
    });
}

updatePlayersLnpId();
