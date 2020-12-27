import React from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
import logo from '../assets/logo.png';

export const AuthTemplate: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          variant="square"
          src={logo}
          alt="PlaymakerPro Logo"
        />
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '92px',
    height: '84px',
  },
}));
