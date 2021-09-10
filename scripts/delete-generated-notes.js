const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Note = require('../modules/notes/note.model');

dotenv.config({ path: './config/config.env' });

async function deleteNotes() {
  await connectDB(process.env.PRODUCTION_DB_CONNECT);

  await Note.deleteMany({ isSeededFromPlaymakerDb: true });
  console.log('Notes removed!'.red.inverse);
  process.exit();
}

deleteNotes();
