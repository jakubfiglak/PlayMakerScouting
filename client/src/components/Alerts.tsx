import React from 'react';
// MUI components
import { makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// Hooks
import { useAlertsState } from '../context/alerts/useAlertsState';

export const Alerts = () => {
  const classes = useStyles();
  const alertsContext = useAlertsState();

  const { alerts } = alertsContext;

  return (
    <div className={classes.alertsContainer}>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} severity={alert.type} variant="filled">
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  alertsContainer: {
    position: 'fixed',
    top: theme.spacing(2),
    left: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5000,
  },
}));
