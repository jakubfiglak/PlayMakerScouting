import { Button, makeStyles, Theme, Typography, Link } from '@material-ui/core';
import { Value } from './types';

type Props = {
  value: Value;
};

export const ValueTile = ({ value }: Props) => {
  const classes = useStyles();

  const { number, title, icon, values, link } = value;

  return (
    <div className={classes.tile}>
      <div className={classes.heading}>
        <div className={classes.number}>{number}</div>
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          {icon}
        </div>
      </div>
      <ul className={classes.list}>
        {values.map((valueEl) => (
          <li key={valueEl} className={classes.listItem}>
            {valueEl}
          </li>
        ))}
      </ul>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Zobacz przykład
        </Button>
      </Link>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  tile: {
    flex: '1 1 25%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('lg')]: {
      flexBasis: '50%',
    },

    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(2),
  },
  titleContainer: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  number: {
    fontSize: 36,
    padding: theme.spacing(2),
    borderRadius: 10,
    background: '#000',
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
  },
  title: {
    fontSize: 24,
  },
  list: {
    marginBottom: theme.spacing(4),
  },
  listItem: {
    fontSize: 18,
  },
  link: {
    display: 'block',
    margin: '0 auto',
    marginTop: 'auto',
    fontSize: 18,

    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    width: '100%',
  },
}));
