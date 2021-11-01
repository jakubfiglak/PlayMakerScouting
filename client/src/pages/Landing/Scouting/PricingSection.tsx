import { Typography, makeStyles, Theme } from '@material-ui/core';
import { pricing } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';

import { PricingGrid } from './PricingGrid';

export const PricingSection = () => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Cennik
        </Typography>
        <PricingGrid pricing={pricing} summary buttonText="Zgłoś się do nas" />
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
}));
