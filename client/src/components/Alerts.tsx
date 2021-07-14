import { Slide, makeStyles, Theme } from '@material-ui/core';
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
        alerts.map((alert) => {
          const { id, isVisible, msg, type } = alert;

          return (
            <Slide
              key={id}
              in={isVisible}
              direction="down"
              mountOnEnter
              unmountOnExit
            >
              <Alert severity={type} variant="filled">
                {msg}
              </Alert>
            </Slide>
          );
        })}
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
