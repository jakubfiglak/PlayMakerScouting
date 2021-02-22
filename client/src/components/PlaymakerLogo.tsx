import React from 'react';
import { makeStyles, Theme, Avatar, Typography } from '@material-ui/core';
import logo from '../assets/logo_square.jpg';

export const PlaymakerLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Avatar
        className={classes.avatar}
        variant="square"
        src={logo}
        alt="PlaymakerPro Logo"
      />
      <Typography variant="h6" noWrap component="h1">
        PlayMaker Pro Scouting
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1, 1, 1, 0),
    width: '45px',
    height: '100%',
    borderRadius: '50%',
    boxShadow: theme.shadows[5],
  },
}));
