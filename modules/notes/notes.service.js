const Note = require('./note.model');

async function getNotesForMatch(matchId) {
  const notes = await Note.find({ match: matchId });
  return notes;
}

module.exports = { getNotesForMatch };
