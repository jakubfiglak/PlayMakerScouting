import { Typography, makeStyles, Theme } from '@material-ui/core';
import { PricingCard } from '../PricingCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { mainPricing } from './data';

export const PricingSection = () => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Cennik
        </Typography>
        <div className={classes.container}>
          <PricingCard
            features={mainPricing.features}
            priceFrom
            price={mainPricing.price}
            buttonText="Zgłoś się do nas"
          />
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  container: {
    maxWidth: 600,
    margin: '0 auto',
    marginBottom: 50,
  },
}));
