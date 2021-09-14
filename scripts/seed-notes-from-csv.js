const fs = require('fs');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const connectDB = require('../config/db');
const Note = require('../modules/notes/note.model');
const Match = require('../modules/matches/match.model');
const Club = require('../modules/clubs/club.model');
const User = require('../modules/users/user.model');
const Player = require('../modules/players/player.model');

dotenv.config({ path: './config/config.env' });

const prodAdminId = '6047f176c5d45231a400ef89';
const devAdminId = '5d7a514b5d2c12c7449be042';

const results = [];

async function seedNotes() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  fs.createReadStream(path.resolve(__dirname, '../data', '2021-09-10-notes.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      const notes = results.map((result) => ({
        player: result.player,
        playerCurrentClub: result.playerCurrentClub,
        author: result.author,
        match: result.match,
        positionPlayed: result.positionPlayed,
        shirtNo: result.shirtNo,
        text: result.text,
        maxRatingScore: result.maxRatingScore,
        rating: result.rating,
        isSeededFromPlaymakerDb: true,
      }));

      const created = await Note.create(notes);
      console.log(created);
      console.log(`Created ${created.length} notes!`.green.inverse);
      process.exit();
    });
}

seedNotes();
