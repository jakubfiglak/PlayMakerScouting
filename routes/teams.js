const express = require('express');
const {
  createTeam,
  getTeams,
  getTeam,
  addMember,
  removeMember,
  deleteTeam,
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
  ],
  createTeam
);
router.get('/', [protect, authorize('admin')], getTeams);
router.get('/:id', [protect, authorize('admin')], getTeam);
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
router.delete('/:id', [protect, authorize('admin'), setTeam], deleteTeam);

module.exports = router;
