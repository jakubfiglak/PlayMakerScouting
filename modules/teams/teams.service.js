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

async function updateTeam({ team, reqBody }) {
  const editedTeam = team;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedTeam[key] = reqBody[key];
    }
  });

  const modifiedTeam = await editedTeam.save();
  return modifiedTeam;
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
  updateTeam,
  addMember,
  removeMember,
};
