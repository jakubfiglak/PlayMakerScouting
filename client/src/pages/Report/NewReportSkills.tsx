import React from 'react';
import clsx from 'clsx';
// MUI components
import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Types
import { Skill } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  skills: Skill[];
  maxRatingScore: number;
  printeable?: boolean;
};

export const NewReportSkills = ({
  skills,
  printeable,
  maxRatingScore,
}: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {skills.map((skill) => (
        <Grid item xs={printeable ? 6 : 12} key={skill.name}>
          <div className={classes.container}>
            <Typography
              className={clsx({
                [classes.text]: printeable,
              })}
            >
              <strong>{getLabel(skill.name)}</strong>
            </Typography>
            {skill.score && (
              <Rating
                name={`${skill.name}.rating`}
                value={skill.score}
                max={maxRatingScore}
                icon={<BallIcon fontSize="inherit" />}
                readOnly
                size={printeable ? 'small' : 'medium'}
              />
            )}
            {skill.score && printeable && (
              <Typography className={classes.text}>
                <strong>
                  {skill.score}/{maxRatingScore}
                </strong>
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
            {skill.description}
          </Typography>
        </Grid>
      ))}
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
