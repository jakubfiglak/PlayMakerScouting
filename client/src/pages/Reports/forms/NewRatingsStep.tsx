import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Rating } from '../../../types/ratings';
import { groupSkillsByCategory } from '../../../utils/groupSkillsByCategory';
import { getLabel } from '../../../utils/getLabel';
import { NewRatingInput } from './NewRatingInput';
import { FormContainer } from '../../../components/FormContainer';

type Props = { ratings: Rating[]; maxRatingScore: number };

export const NewRatingsStep = ({ ratings, maxRatingScore }: Props) => {
  const classes = useStyles();

  const groupedRatings = groupSkillsByCategory(ratings);
  console.log(groupedRatings);

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
                value.map((rating, index) => (
                  <NewRatingInput
                    key={rating.id}
                    title={rating.name}
                    hasScore={rating.score}
                    index={ratings.findIndex((el) => el.id === rating.id)}
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
