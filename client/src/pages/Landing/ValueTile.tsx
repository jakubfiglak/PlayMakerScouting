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
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    height: '100%',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    width: '100%',
  },
  number: {
    fontSize: 24,
    padding: theme.spacing(2),
    borderRadius: 10,
    background: '#000',
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
  },
  title: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeightBold,
  },
  list: {
    marginBottom: theme.spacing(1),
  },
  listItem: {
    fontSize: 16,
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
