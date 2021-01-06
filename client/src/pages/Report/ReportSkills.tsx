import React from 'react';
// MUI components
import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Types
import { IndividualSkills, TeamplaySkills } from '../../types/reports';
// Utils & data
import { getRatingLabel } from '../../utils';

type Props = {
  skills: IndividualSkills | TeamplaySkills;
};

export const ReportSkills = ({ skills }: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {Object.entries(skills).map(
        ([key, value]) =>
          value && (
            <Grid item xs={12} key={key}>
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
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
}));
