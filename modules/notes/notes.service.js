const Note = require('./note.model');
const resultsOptions = require('./options');

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

module.exports = {
  getNoteById,
  createNote,
  getAllNotes,
  getAllNotesList,
  getNotesForClub,
  updateNote,
  deleteNote,
  getNotesForMatch,
};
