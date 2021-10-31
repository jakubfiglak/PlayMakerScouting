import { Typography, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from '../LayoutContentWrapper';

export const CopySection = () => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper} id="copy">
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Skauting Scout<em>Maker</em>.Pro
        </Typography>
        <Typography className={classes.text}>
          Usługa skautingowa pozwalająca na monitorowanie każdej ligi
          piłkarskiej w Polsce. Zespół wyszkolonych skautów obserwuje wskazane
          przez klub rozgrywki i dostarcza notatki oraz raporty meczowe według
          wybranych parametrów. Sprawozdania poszerzone są o zaawansowane bazy
          danych statystycznych naszych analityków sportowych. ScoutMaker.pro
          odpowiada bieżącemu zapotrzebowaniu kadrowemu oraz wpisuje się w
          długofalowy plan budowania zespołu.{' '}
        </Typography>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: '#000',
    color: theme.palette.primary.contrastText,
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(3, 0),
    textAlign: 'center',

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  text: {
    fontSize: 24,
    padding: theme.spacing(1),
  },
}));
