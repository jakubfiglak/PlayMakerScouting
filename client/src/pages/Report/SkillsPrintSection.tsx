import { Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ReportSkills } from './ReportSkills';
// Types
import { Skill } from '../../types/reports';
import { SkillsCategories } from '../../types/ratings';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  category: SkillsCategories;
  skills: Skill[];
  maxRatingScore: number;
};

export const SkillsPrintSection = ({
  category,
  skills,
  maxRatingScore,
}: Props) => {
  const classes = useStyles();

  return (
    <section>
      <Typography variant="h6" align="center" className={classes.heading}>
        {getLabel(category)}
      </Typography>
      <ReportSkills
        skills={skills}
        printeable
        maxRatingScore={maxRatingScore}
      />
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));
