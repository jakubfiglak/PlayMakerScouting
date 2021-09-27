const Note = require('./note.model');
const resultsOptions = require('./options');
const uniquifyArray = require('../../utils/uniquifyArray');

function getNoteById(id) {
  return Note.findById(id);
}

async function createNote(noteData) {
  const note = await Note.create(noteData);
  return note;
}

async function getAllNotes({ query, paginationOptions, accessFilters }) {
  const modifiedQuery = { ...query, ...accessFilters };
  const notes = await Note.paginate(modifiedQuery, paginationOptions);
  return notes;
}

async function getNotesForMatch(matchId) {
  const notes = await Note.find({ match: matchId });
  return notes;
}

async function getNotesForClub(clubId) {
  const notes = await Note.find({ playerCurrentClub: clubId });
  return notes;
}

async function getNotesForPlayer(playerId) {
  const notes = await Note.find({ player: playerId });
  return notes;
}

async function getAllNotesList(accessFilters) {
  const notes = await Note.find({ ...accessFilters }).select(resultsOptions.listSelect);

  return notes;
}

async function updateNote({ note, reqBody }) {
  const editedNote = note;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedNote[key] = reqBody[key];
    }
  });
  const modifiedNote = await editedNote.save();

  return modifiedNote;
}

async function deleteNote(note) {
  await note.remove();
}

async function getMultipleNotesPlayersClubsAndMatches(noteIds) {
  const notes = await Note.find({ _id: { $in: noteIds } });

  const playerIds = notes.map((note) => note.player?.id).filter((id) => id);
  const clubIds = notes.map((note) => note.playerCurrentClub?.id).filter((id) => id);
  const matchIds = notes.map((note) => note.match?.id).filter((id) => id);

  return {
    players: uniquifyArray(playerIds),
    clubs: uniquifyArray(clubIds),
    matches: uniquifyArray(matchIds),
  };
}

module.exports = {
  getNoteById,
  createNote,
  getAllNotes,
  getAllNotesList,
  getNotesForPlayer,
  getNotesForClub,
  updateNote,
  deleteNote,
  getNotesForMatch,
  getMultipleNotesPlayersClubsAndMatches,
};
