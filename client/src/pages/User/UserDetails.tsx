import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Person as PersonIcon } from '@material-ui/icons';
// Types
import { User } from '../../types/auth';

type Props = {
  user: User;
};

export const UserDetails = ({ user }: Props) => {
  const classes = useStyles();

  const {
    firstName,
    lastName,
    role,
    email,
    city,
    voivodeship,
    phone,
    team,
  } = user;

  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="user avatar" className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
        subheader={role}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Email: </strong>
              {email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Nr telefonu: </strong>
              {phone || 'brak'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Województwo: </strong>
              {voivodeship || 'brak'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Miasto: </strong>
              {city || 'brak'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Zespół: </strong>
              {team ? team.name : 'brak'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 500,
    margin: '0 auto',
  },
  avatar: {
    background: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
}));
