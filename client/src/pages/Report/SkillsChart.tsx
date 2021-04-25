import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Skill } from '../../types/reports';
import { yellow, yellowTransparent } from '../../theme/colors';

type Props = {
  skills: Skill[];
  width?: number;
  height?: number;
};

const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scale: {
    ticks: { beginAtZero: true, min: 0, max: 4, stepSize: 1 },
  },
  max: 1,
  stepSize: 1,
  animation: {
    duration: 0,
  },
};

export const SkillsChart = ({ skills, width, height }: Props) => {
  const data = {
    labels: skills.map((skill) => skill.name.toUpperCase()),
    datasets: [
      {
        data: skills.map((skill) => skill.score),
        backgroundColor: yellowTransparent,
        borderColor: yellow,
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data} options={options} width={width} height={height} />;
};
