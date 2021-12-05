import React, { ReactNode } from 'react';
import CountUp from 'react-countup';
import { makeStyles, Theme, Typography } from '@material-ui/core';

type Props = {
  title: string;
  count?: number;
  icon: ReactNode;
};

export const AppNumber = ({ title, count, icon }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.count}>
        {count ? <CountUp end={count} /> : 0}
      </Typography>
      <div className={classes.titleContainer}>
        <Typography className={classes.title}>{title}</Typography>
        {icon}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  count: {
    fontSize: 32,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 24,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));
