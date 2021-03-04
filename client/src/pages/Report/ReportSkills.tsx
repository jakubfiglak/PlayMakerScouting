import React from 'react';
import clsx from 'clsx';
// MUI components
import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Types
import { IndividualSkills, TeamplaySkills } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  skills: IndividualSkills | TeamplaySkills;
  printeable?: boolean;
};

export const ReportSkills = ({ skills, printeable }: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {Object.entries(skills).map(
        ([key, value]) =>
          value && (
            <Grid item xs={12} key={key}>
              <div className={classes.container}>
                <Typography
                  className={clsx({
                    [classes.text]: printeable,
                  })}
                >
                  <strong>{getLabel(key)}</strong>
                </Typography>
                <Rating
                  name={`${key}.rating`}
                  value={value.rating}
                  max={4}
                  icon={<BallIcon fontSize="inherit" />}
                  readOnly
                  size={printeable ? 'small' : 'medium'}
                />
                {printeable && (
                  <Typography className={classes.text}>
                    <strong>{value.rating}/4</strong>
                  </Typography>
                )}
              </div>
              <Typography
                variant="body2"
                color="textSecondary"
                className={clsx({
                  [classes.text]: printeable,
                })}
              >
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
  text: {
    fontSize: 10,
  },
}));
