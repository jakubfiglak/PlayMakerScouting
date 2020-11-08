const getIndividualSkillsProps = (individualSkills, position) => {
  const {
    ballReception,
    holdPass,
    gainPass,
    keyPass,
    defOneOnOne,
    airPlay,
    positioning,
    attOneOnOne,
    finishing,
  } = individualSkills;

  const commonFields = { holdPass, gainPass, keyPass, ballReception };

  switch (position) {
    case 'CB':
      return { ...commonFields, defOneOnOne, airPlay, positioning };

    case 'FB':
      return { ...commonFields, defOneOnOne, attOneOnOne, airPlay };
    case 'CM':
    case 'WM':
      return { ...commonFields, finishing, attOneOnOne, defOneOnOne };
    case 'F':
      return { ...commonFields, finishing, airPlay, attOneOnOne };
    default:
      return commonFields;
  }
};

module.exports = getIndividualSkillsProps;
