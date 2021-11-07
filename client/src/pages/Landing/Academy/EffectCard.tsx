import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';

type Props = {
  title: string;
  text: string;
  logo: string;
};

export const EffectCard = ({ title, text, logo }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <div className={classes.imageContainer}>
          <img src={logo} alt={title} className={classes.image} />
        </div>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.text}>{text}</Typography>
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Zobacz
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
  text: {
    fontSize: 18,
  },
  button: {
    width: '100%',
  },
}));
