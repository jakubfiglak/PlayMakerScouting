import React from 'react';
// MUI components
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import {
  SportsSoccer as BallIcon,
  Note as NotesIcon,
  FormatListNumbered as StatsIcon,
  RateReview as RatesIcon,
} from '@material-ui/icons';

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
        label="Mecz"
        icon={<BallIcon />}
        disabled={activeStep <= 1}
        value={2}
      />
      <BottomNavigationAction
        label="Notatki"
        icon={<NotesIcon />}
        disabled={activeStep <= 1}
        value={3}
      />
      <BottomNavigationAction
        label="Oceny"
        icon={<RatesIcon />}
        disabled={activeStep <= 1}
        value={4}
      />
      <BottomNavigationAction
        label="Statystyki"
        icon={<StatsIcon />}
        disabled={activeStep <= 1}
        value={5}
      />
    </BottomNavigation>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  bottomNav: {
    width: '500px',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(calc(-50% + 120px))',
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1000,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));
