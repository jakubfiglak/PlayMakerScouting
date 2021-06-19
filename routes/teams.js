const express = require('express');
const {
  createTeam,
  getTeams,
  addMember,
  removeMember,
} = require('../modules/teams/teams.controller');
const {
  setTeam,
  checkIfAllMembersExist,
  checkIfMemberExists,
  checkIfMembersBelongToAnotherTeam,
  checkIfMemberBelongsToAnotherTeam,
  checkMembersRoles,
  checkMemberRole,
} = require('../modules/teams/teams.middleware');
const {
  createAclOnTeamCreation,
} = require('../modules/accessControlLists/accessControlList.middleware');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  [
    protect,
    authorize('admin'),
    checkIfAllMembersExist,
    checkIfMembersBelongToAnotherTeam,
    checkMembersRoles,
    createTeam,
    createAclOnTeamCreation,
  ],
  (req, res) => res.end()
);
router.get('/', [protect, authorize('admin')], getTeams);
router.patch(
  '/:id/add-member',
  [
    protect,
    authorize('admin'),
    checkIfMemberExists,
    checkIfMemberBelongsToAnotherTeam,
    checkMemberRole,
    setTeam,
  ],
  addMember
);
router.patch('/:id/remove-member', [protect, authorize('admin'), setTeam], removeMember);

module.exports = router;
