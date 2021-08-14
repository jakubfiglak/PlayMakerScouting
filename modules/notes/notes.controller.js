const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const notesService = require('./notes.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');

// @desc Create new note
// @route POST /api/v1/notes
// @access Private
exports.createNote = asyncHandler(async (req, res) => {
  const note = await notesService.createNote(req.body);

  await accessControlListsService.grantAccessOnAssetCreation({
    userRole: req.user.role,
    userAcl: req.userAcl,
    teamAcl: req.teamAcl,
    assetType: 'note',
    assetId: note._id,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new note!',
    data: note,
  });
});

// @desc Get all notes
// @route GET /api/v1/notes
// @route GET /api/v1/players/:playerId/notes
// @route GET /api/v1/matches/:matchId/notes
// @access Private
exports.getNotes = asyncHandler(async (req, res) => {
  const { playerId, matchId } = req.params;

  if (playerId) {
    req.query.player = playerId;
  }
  if (matchId) {
    req.query.match = matchId;
  }
  const { query, paginationOptions, accessFilters } = req;
  const notes = await notesService.getAllNotes({ query, paginationOptions, accessFilters });

  res.status(httpStatus.OK).json({
    success: true,
    data: notes,
  });
});

// @desc Get notes list
// @route GET /api/v1/notes/list
// @access Private
exports.getNotesList = asyncHandler(async (req, res) => {
  const notes = await notesService.getAllNotesList(req.accessFilters);

  return res.status(httpStatus.OK).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// @desc Get single note
// @route GET /api/v1/notes/:id
// @access Private
exports.getNote = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.note,
  });
});

// @desc Update note details
// @route PUT /api/v1/notes/:id
// @access Private
exports.updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await notesService.updateNote({
    club: req.club,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Note with the id of ${id} successfully updated!`,
    data: note,
  });
});

// @desc Delete note
// @route DELETE /api/v1/notes/:id
// @access Private
exports.deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await notesService.deleteNote(req.club);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Club with the id of ${id} successfully removed!`,
    data: id,
  });
});
