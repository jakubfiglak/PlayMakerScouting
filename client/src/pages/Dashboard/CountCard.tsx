import React, { ReactElement } from 'react';
import CountUp from 'react-countup';
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

type Props = {
  title: string;
  count?: number;
  icon: ReactElement;
};

export const CountCard = ({ title, count, icon }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.container}>
        <div>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title.toUpperCase()}
          </Typography>
          <Typography color="textPrimary" variant="h3" component="p">
            {count ? <CountUp end={count} /> : 0}
          </Typography>
        </div>
        <div>
          <Avatar className={classes.avatar}>{icon}</Avatar>
        </div>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
}));
