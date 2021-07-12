import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
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
        <Accordion key={key}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}-skills-content`}
            id={`${key}-skills`}
          >
            <Typography className={classes.title}>{getLabel(key)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.container}>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
}));
