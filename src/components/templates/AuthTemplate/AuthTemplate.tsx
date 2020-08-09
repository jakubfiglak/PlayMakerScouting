import React from 'react';
import { Container, CssBaseline, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../../assets/logo.png';

const AuthTemplate: React.FC<{ title: string }> = ({ title, children }) => {
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

export default AuthTemplate;
