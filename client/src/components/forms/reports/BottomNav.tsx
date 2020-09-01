import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Indywidualne"
        icon={<SportsSoccerIcon />}
        disabled
      />
      <BottomNavigationAction
        label="Współdziałanie"
        icon={<PeopleIcon />}
        disabled
      />
      <BottomNavigationAction
        label="Motoryczne"
        icon={<DirectionsRunIcon />}
        disabled
      />
      <BottomNavigationAction
        label="Statystyki"
        icon={<FormatListNumberedIcon />}
        disabled
      />
    </BottomNavigation>
  );
};
