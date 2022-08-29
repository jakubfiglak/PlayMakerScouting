const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

const results = [];

async function updatePlayersClub() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2022-04-12-update_player_club.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      // const updates = [
      //   {
      //     _id: '5ee50d4327c7c5c1998a4196',
      //     club: '610c4e79f62d0c4e1ccf31b3',
      //   },
      //   {
      //     _id: '5ee50d93e1a9105fcf95cb5f',
      //     club: '610c4e79f62d0c4e1ccf31b3',
      //   },
      //   {
      //     _id: '5fdf98fa2676271878e3687a',
      //     club: '610c4e79f62d0c4e1ccf31b3',
      //   },
      // ];

      async function update(playerId, clubId) {
        const player = await Player.findById(playerId);
        player.club = clubId;
        await player.save();
        console.log(
          `Updated player ${player.firstName} ${player.lastName} with clubId ${clubId}`.green
            .inverse
        );
      }

      const promiseArr = results.map((data) => update(data._id, data.club));

      await Promise.all(promiseArr);

      process.exit();
    });
}

updatePlayersClub();
