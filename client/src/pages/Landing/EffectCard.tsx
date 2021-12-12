import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';

type Props = {
  title: string;
  text: string;
  logo: string;
  link: string;
};

export const EffectCard = ({ title, text, logo, link }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.imageContainer}>
          <img src={logo} alt={title} className={classes.image} />
        </div>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography>{text}</Typography>
      </CardContent>
      <CardActions>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Zobacz
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    margin: '0 auto',
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  link: {
    display: 'block',
    width: '100%',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    width: '100%',
  },
}));
