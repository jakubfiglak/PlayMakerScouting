import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  makeStyles,
} from '@material-ui/core';

type Props = { title: string; linkTo: string };

export const CreateCard = ({ title, linkTo }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <Link
        to={{ pathname: linkTo, state: { activeTab: 1 } }}
        className={classes.link}
      >
        <CardActionArea className={classes.actionArea}>
          <CardContent className={classes.container}>
            <Typography variant="h6" className={classes.text}>
              {title.toUpperCase()}
            </Typography>
            <div>
              <Avatar className={classes.avatar}>
                <AddIcon />
              </Avatar>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  actionArea: {
    height: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
}));
