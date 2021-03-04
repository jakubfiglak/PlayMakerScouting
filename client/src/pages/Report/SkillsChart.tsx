import React from 'react';
import { Radar } from 'react-chartjs-2';
import { IndividualSkills, TeamplaySkills } from '../../types/reports';
import { yellow, yellowTransparent } from '../../theme/colors';

type Props = {
  individualSkills: IndividualSkills;
  teamplaySkills: TeamplaySkills;
};

const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scale: {
    ticks: { beginAtZero: true, min: 0, max: 4, stepSize: 1 },
  },
  max: 1,
  stepSize: 1,
};

export const SkillsChart = ({ individualSkills, teamplaySkills }: Props) => {
  const skills = { ...individualSkills, ...teamplaySkills };

  const data = {
    labels: Object.keys(skills),
    datasets: [
      {
        data: Object.entries(skills).map(([_, value]) => value?.rating),
        backgroundColor: yellowTransparent,
        borderColor: yellow,
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data} options={options} />;
};
