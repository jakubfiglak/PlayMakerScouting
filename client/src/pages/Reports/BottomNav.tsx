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

  const disabled = activeStep <= 2;

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
        disabled={disabled}
        value={3}
      />
      <BottomNavigationAction
        label="Notatki"
        icon={<NotesIcon />}
        disabled={disabled}
        value={4}
      />
      <BottomNavigationAction
        label="Oceny"
        icon={<RatesIcon />}
        disabled={disabled}
        value={5}
      />
      <BottomNavigationAction
        label="Statystyki"
        icon={<StatsIcon />}
        disabled={disabled}
        value={6}
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
