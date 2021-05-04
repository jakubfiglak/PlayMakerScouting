function getSkillsArrayWithScore({ category, skills }) {
  return Object.entries(skills).map(([key, value]) => ({
    category,
    name: key,
    shortName: key.slice(0, 4),
    hasScore: true,
    score: value.rating,
    description: value.note,
  }));
}

function getSkillsArrayForMotorSkills(skills) {
  return Object.entries(skills).map(([key, value]) => ({
    category: 'physical',
    name: key,
    shortName: key.slice(0, 4),
    hasScore: false,
    description: value,
  }));
}

module.exports = {
  async up(db) {
    const reports = await db.collection('reports').find().toArray();

    const operations = reports.map((report) => {
      const individual = getSkillsArrayWithScore({
        category: 'individual',
        skills: report.individualSkills,
      });
      const teamplay = getSkillsArrayWithScore({
        category: 'teamplay',
        skills: report.teamplaySkills,
      });
      const motor = getSkillsArrayForMotorSkills(report.motorSkills);

      const skills = [...individual, ...teamplay, ...motor];

      return db.collection('reports').updateOne({ _id: report._id }, { $set: { skills } });
    });

    await Promise.all(operations);
  },

  async down(db) {
    await db.collection('reports').updateMany({}, { $unset: { skills: null } });
  },
};
