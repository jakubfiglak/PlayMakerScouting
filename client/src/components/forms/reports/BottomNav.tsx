import React from 'react';
// MUI components
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
// MUI icons
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PeopleIcon from '@material-ui/icons/People';
// styles
import { useStyles } from '../styles';

type BottomNavProps = {
  activeStep: number;
  setActiveStep: (value: React.SetStateAction<number>) => void;
};

export const BottomNav = ({ activeStep, setActiveStep }: BottomNavProps) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={activeStep}
      onChange={(_, newStep) => {
        setActiveStep(newStep);
      }}
      showLabels
      className={classes.bottomNav}
    >
      <BottomNavigationAction
        label="Indywidualne"
        icon={<SportsSoccerIcon />}
        disabled={activeStep <= 2}
        value={3}
      />
      <BottomNavigationAction
        label="Współdziałanie"
        icon={<PeopleIcon />}
        disabled={activeStep <= 2}
        value={4}
      />
      <BottomNavigationAction
        label="Motoryczne"
        icon={<DirectionsRunIcon />}
        disabled={activeStep <= 2}
        value={5}
      />
      <BottomNavigationAction
        label="Statystyki"
        icon={<FormatListNumberedIcon />}
        disabled={activeStep <= 2}
        value={7}
      />
    </BottomNavigation>
  );
};
