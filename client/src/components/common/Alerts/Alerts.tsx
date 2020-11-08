import React from 'react';
// MUI components
import { Alert } from '@material-ui/lab';
// Hooks
import { useAlertsState } from '../../../context';
// Styles
import { useStyles } from '../styles';

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
