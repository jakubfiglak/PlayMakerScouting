const Team = require('./team.model');

function getAllTeams() {
  return Team.find();
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

module.exports = { getAllTeams, createTeam, updateTeam };
