const express = require('express');
const { createTeam, getTeams, updateTeam } = require('../modules/teams/teams.controller');
const { setTeam, validateMembers } = require('../modules/teams/teams.middleware');
const {
  createAclOnTeamCreation,
} = require('../modules/accessControlLists/accessControlList.middleware');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  [protect, authorize('admin'), validateMembers, createTeam, createAclOnTeamCreation],
  (req, res) => res.end()
);
router.get('/', [protect, authorize('admin')], getTeams);
router.put('/:id', [protect, authorize('admin'), validateMembers, setTeam], updateTeam);

module.exports = router;
