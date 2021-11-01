import { Typography, makeStyles, Theme } from '@material-ui/core';
import { historicalDataPricing } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';

import { PricingGrid } from './PricingGrid';

export const HistoricalDataSection = () => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Dostęp do danych historycznych
        </Typography>
        <PricingGrid
          pricing={historicalDataPricing}
          buttonText="Zgłoś się po wycenę"
        />
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: 48,
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
