import { Typography, makeStyles, Theme } from '@material-ui/core';
import { PricingCard } from '../PricingCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { variantOnePricing, variantTwoPricing } from './data';

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
            features={variantOnePricing.features}
            price={variantOnePricing.price}
          />
          <PricingCard
            features={variantTwoPricing.features}
            price={variantTwoPricing.price}
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
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
      gap: theme.spacing(4),
    },
  },
}));
