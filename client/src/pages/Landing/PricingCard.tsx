import { Fragment } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Check as TrueIcon, Close as FalseIcon } from '@material-ui/icons';

type Props = {
  price: string;
  priceFrom?: boolean;
  features: { title: string; value: boolean }[];
  buttonText?: string;
  onButtonClick?: () => void;
};

export const PricingCard = ({
  price,
  priceFrom,
  features,
  buttonText,
  onButtonClick,
}: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" gutterBottom className={classes.heading}>
          {priceFrom ? 'od' : ''} {price}
        </Typography>
        <Divider className={classes.divider} />
        <List>
          {features.map((feature) => (
            <Fragment key={feature.title}>
              <ListItem>
                <ListItemIcon>
                  {feature.value ? (
                    <TrueIcon className={classes.trueIcon} />
                  ) : (
                    <FalseIcon className={classes.falseIcon} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  classes={{ primary: classes.text }}
                />
              </ListItem>
              <Divider className={classes.divider} />
            </Fragment>
          ))}
        </List>
        {buttonText ? (
          <div className={classes.buttonContainer}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'relative',
    overflow: 'visible',
    marginBottom: 50,
  },
  heading: {
    padding: theme.spacing(4, 0),
    marginLeft: theme.spacing(4),
    fontWeight: theme.typography.fontWeightBold,
  },
  divider: {
    background: theme.palette.primary.light,
  },
  trueIcon: {
    fontSize: 24,
    color: theme.palette.success.main,
  },
  falseIcon: {
    fontSize: 24,
    color: theme.palette.error.main,
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    height: 30,
  },
  button: {
    padding: theme.spacing(2, 4),
    fontWeight: theme.typography.fontWeightBold,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%)',

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
