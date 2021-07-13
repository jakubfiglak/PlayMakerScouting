import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  makeStyles,
} from '@material-ui/core';

type Props = {
  title: string;
  count?: number;
  icon: ReactElement;
  linkTo: string;
};

export const CountCard = ({ title, count, icon, linkTo }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <Link to={linkTo} className={classes.link}>
        <CardActionArea>
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
        </CardActionArea>
      </Link>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
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
