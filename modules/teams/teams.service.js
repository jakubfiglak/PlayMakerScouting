const Team = require('./team.model');

function getAllTeams() {
  return Team.find();
}

function getTeamById(id) {
  return Team.findById(id);
}

function getTeamByMemberId(id) {
  return Team.findOne({ members: id });
}

async function createTeam(teamData) {
  const team = await Team.create(teamData);
  return team;
}

async function addMember({ team, memberId }) {
  const editedTeam = team;

  editedTeam.members.push(memberId);
  const modifiedTeam = await editedTeam.save();
  return modifiedTeam;
}

async function removeMember({ team, memberId }) {
  const editedTeam = team;

  editedTeam.members = editedTeam.members.filter((member) => member._id.toHexString() !== memberId);
  const modifiedTeam = await editedTeam.save();
  return modifiedTeam;
}

function deleteTeam(team) {
  return team.remove();
}

module.exports = {
  getAllTeams,
  getTeamById,
  getTeamByMemberId,
  createTeam,
  addMember,
  removeMember,
  deleteTeam,
};
