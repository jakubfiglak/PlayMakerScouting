import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { SkillsCategories } from '../../../types/ratings';
import { groupSkillsByCategory } from '../../../utils/groupSkillsByCategory';
import { getLabel } from '../../../utils/getLabel';
import { RatingInput } from './RatingInput';
import { FormContainer } from '../../../components/FormContainer';

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
            <FormContainer>
              {value &&
                value.map((rating) => (
                  <RatingInput
                    key={rating.name}
                    title={rating.name}
                    hasScore={rating.hasScore}
                    index={ratings.findIndex((el) => el.name === rating.name)}
                    maxRatingScore={maxRatingScore}
                  />
                ))}
            </FormContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
  },
}));
