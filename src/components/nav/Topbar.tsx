import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import TopbarMenu from './TopbarMenu';

const Topbar: React.FC = () => {
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
