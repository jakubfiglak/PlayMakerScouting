import { HashLink } from 'react-router-hash-link';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { ArrowForwardIos as Arrow } from '@material-ui/icons';

type Props = {
  text: string;
  linkTo: string;
};

export const GoToSectionButton = ({ text, linkTo }: Props) => {
  const classes = useStyles();

  return (
    <HashLink smooth to={linkTo} className={classes.link}>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        endIcon={<Arrow />}
      >
        {text}
      </Button>
    </HashLink>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: 'none',
  },
  button: {
    width: 350,
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
