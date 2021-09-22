import { Radar } from 'react-chartjs-2';
import { Skill } from '../../types/reports';
import { yellow, yellowTransparent } from '../../theme/colors';

type Props = {
  skills: Skill[];
  width?: number;
  height?: number;
  maxRatingScore: number;
  displayShortName?: boolean;
};

export const SkillsChart = ({
  skills,
  width,
  height,
  maxRatingScore,
  displayShortName,
}: Props) => {
  const options = {
    maintainAspectRatio: false,
    legend: { display: false },
    scale: {
      ticks: { beginAtZero: true, min: 0, max: maxRatingScore, stepSize: 1 },
    },
    max: 1,
    stepSize: 1,
    animation: {
      duration: 0,
    },
  };

  const data = {
    labels: skills.map((skill) =>
      displayShortName
        ? skill.shortName.toUpperCase()
        : skill.name.toUpperCase(),
    ),
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
