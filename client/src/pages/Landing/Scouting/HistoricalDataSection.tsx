import { Typography, makeStyles, Theme } from '@material-ui/core';
import { PricingCard } from '../PricingCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { historicalDataPricing } from './data';

type Props = {
  onButtonClick?: () => void;
};

export const HistoricalDataSection = ({ onButtonClick }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Dostęp do danych historycznych
        </Typography>
        <div className={classes.container}>
          <PricingCard
            features={historicalDataPricing.features}
            price={historicalDataPricing.price}
            buttonText="Zgłoś się po wycenę"
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
    maxWidth: 600,
    margin: '0 auto',
  },
}));
