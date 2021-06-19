const Team = require('./team.model');

function getAllTeams() {
  return Team.find();
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

module.exports = {
  getAllTeams,
  getTeamByMemberId,
  createTeam,
  addMember,
  removeMember,
};
