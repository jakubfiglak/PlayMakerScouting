import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { Pricing } from './data';

type Props = {
  pricing: Pricing[];
};

export const PricingGrid = ({ pricing }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.keysList}>
        {pricing.map((el) => (
          <React.Fragment key={el.key}>
            <span>{el.key}</span>
            <span className="value">
              {el.value === true ? <CheckIcon color="inherit" /> : el.value}
            </span>
          </React.Fragment>
        ))}
        <p className={classes.summaryTitle}>Koszt</p>
        <p className={classes.summaryValue}>od 1199 PLN</p>
        <div />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Zgłoś się do nas
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    fontSize: 18,
    justifyContent: 'center',
  },
  keysList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(0, 2),

    '& span': {
      padding: theme.spacing(1),
    },

    '& span:nth-child(odd)': {
      textAlign: 'end',
    },

    '& .value': {
      textAlign: 'center',
      background: '#000',
      color: theme.palette.primary.contrastText,
    },

    '& .value:nth-child(2)': {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    '& .value:nth-last-child(-n+5)': {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  },
  summaryTitle: {
    textAlign: 'end',
    padding: theme.spacing(0, 1),
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
  },
  summaryValue: {
    textAlign: 'center',
    padding: theme.spacing(0, 1),
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
  },
  button: {
    width: '80%',
    justifySelf: 'center',
  },
}));
