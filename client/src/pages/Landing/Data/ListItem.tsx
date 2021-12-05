import { makeStyles, Theme, Typography } from '@material-ui/core';

type Props = {
  number: string;
  text: string;
};

export const ListItem = ({ number, text }: Props) => {
  const classes = useStyles();

  return (
    <ul className={classes.container}>
      <div className={classes.number}>{number}</div>
      <Typography className={classes.text}>{text}</Typography>
    </ul>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  number: {
    fontSize: 24,
    padding: theme.spacing(2),
    borderRadius: 10,
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  text: {
    fontSize: 24,
  },
}));
