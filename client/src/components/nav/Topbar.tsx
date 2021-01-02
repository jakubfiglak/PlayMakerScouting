import React from 'react';
// MUI components
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// Custom components
import { TopbarMenu } from './TopbarMenu';
// Styles
import { useStyles } from './styles';

const Topbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          PlayMaker Pro Scouting
        </Typography>
        <TopbarMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
