import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  AccordionSummaryProps,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import {
  SportsSoccer as BallIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
// Types
import { IndividualSkills, TeamplaySkills } from '../../types/reports';
// Utils & data
import { getRatingLabel } from '../../utils';

type BasicReportDataProps = {
  skills: IndividualSkills | TeamplaySkills;
  title: string;
} & AccordionSummaryProps;

export const SkillsAccordion = ({
  skills,
  id,
  title,
}: BasicReportDataProps) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {Object.entries(skills).map(
            ([key, value]) =>
              value && (
                <Grid item xs={12}>
                  <div className={classes.container}>
                    <Typography>
                      <strong>{getRatingLabel(key)}</strong>
                    </Typography>
                    <Rating
                      name={`${key}.rating`}
                      value={value.rating}
                      max={4}
                      icon={<BallIcon />}
                      readOnly
                    />
                  </div>
                  <Typography variant="body2" color="textSecondary">
                    {value.note}
                  </Typography>
                </Grid>
              ),
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
}));
