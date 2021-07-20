import { Typography, makeStyles, Theme } from '@material-ui/core';
import { SkillsCategories } from '../../../types/ratings';
import { groupSkillsByCategory } from '../../../utils/groupSkillsByCategory';
import { getLabel } from '../../../utils/getLabel';
import { RatingInput } from './RatingInput';

type RatingType = {
  name: string;
  category: SkillsCategories;
  hasScore: boolean;
};

type Props = { ratings: RatingType[]; maxRatingScore: number };

export const RatingsStep = ({ ratings, maxRatingScore }: Props) => {
  const classes = useStyles();

  const groupedRatings = groupSkillsByCategory(ratings);

  return (
    <>
      {Object.entries(groupedRatings).map(([key, value]) => (
        <>
          <Typography component="h4" variant="h6" align="center" gutterBottom>
            {getLabel(key)}
          </Typography>
          <div>
            {value &&
              value.map((rating) => (
                <div key={rating.name} className={classes.item}>
                  <RatingInput
                    title={rating.name}
                    hasScore={rating.hasScore}
                    index={ratings.findIndex((el) => el.name === rating.name)}
                    maxRatingScore={maxRatingScore}
                  />
                </div>
              ))}
          </div>
        </>
      ))}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    marginBottom: theme.spacing(2),
  },
}));
