// MUI components
import { Typography, Grid } from '@material-ui/core';
// Custom components
import { ReportCard } from './ReportCard';
import { ReportSkills } from './ReportSkills';
// Types
import { Skill } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { groupSkillsByCategory } from '../../utils/groupSkillsByCategory';

type Props = {
  skills: Skill[];
  maxRatingScore: number;
};

export const Ratings = ({ skills, maxRatingScore }: Props) => {
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <ReportCard title="Oceny">
      <Grid container spacing={4}>
        {Object.entries(groupedSkills).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <Typography variant="h6" gutterBottom>
              {getLabel(key)}
            </Typography>
            <ReportSkills
              skills={value || []}
              maxRatingScore={maxRatingScore}
            />
          </Grid>
        ))}
      </Grid>
    </ReportCard>
  );
};
