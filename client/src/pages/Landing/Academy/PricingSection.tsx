import { Typography, makeStyles, Theme } from '@material-ui/core';
import { PricingCard } from '../PricingCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { oneTimeServicePricing, constantCooperationPricing } from './data';

type Props = {
  onButtonClick?: () => void;
};

export const PricingSection = ({ onButtonClick }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Cennik
        </Typography>
        <div className={classes.container}>
          <PricingCard
            features={oneTimeServicePricing.features}
            priceFrom
            price={oneTimeServicePricing.price}
            buttonText="Zapytaj o wycenę"
            onButtonClick={onButtonClick}
          />
          <PricingCard
            features={constantCooperationPricing.features}
            priceFrom
            price={constantCooperationPricing.price}
            buttonText="Zapytaj o wycenę"
            onButtonClick={onButtonClick}
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
