import { Link } from 'react-router-dom';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { ArrowForwardIos as Arrow } from '@material-ui/icons';

type Props = {
  text: string;
  linkTo: string;
};

export const CtaButton = ({ text, linkTo }: Props) => {
  const classes = useStyles();

  return (
    <Link to={linkTo} className={classes.link}>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        endIcon={<Arrow />}
      >
        {text}
      </Button>
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: 'none',
  },
  button: {
    width: 280,
    padding: 16,
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold,
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
}));
