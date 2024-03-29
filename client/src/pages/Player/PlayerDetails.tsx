import { Link as RouterLink } from 'react-router-dom';
// MUI components
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Person as PersonIcon } from '@material-ui/icons';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Player } from '../../types/players';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  player: Player;
};

export const PlayerDetails = ({ player }: Props) => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const isAdmin = user.role === 'admin';

  const {
    firstName,
    lastName,
    position,
    footed,
    yearOfBirth,
    club,
    height,
    weight,
    lnpID,
    lnpProfileURL,
    minut90ProfileURL,
    transfermarktProfileURL,
  } = player;

  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="player avatar" className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
        subheader={`ur. ${yearOfBirth}, ${getLabel(position)}`}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Klub: </strong>
              {club ? (
                <Link component={RouterLink} to={`/clubs/${club.id}`}>
                  {club.name} ({getLabel(club.division)})
                </Link>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Wzrost/waga: </strong>
              {height ? `${height} cm` : 'bd'}/{weight ? `${weight} kg` : 'bd'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Preferowana noga: </strong>
              {getLabel(footed)}
            </Typography>
          </Grid>
          {isAdmin ? (
            <Grid item xs={12}>
              <Typography>
                <strong>ID ŁNP: </strong>
                {lnpID || '-'}
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Typography>
              <strong>Profil ŁNP: </strong>
              {lnpProfileURL ? (
                <Link
                  href={lnpProfileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  {lnpProfileURL}
                </Link>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Profil 90minut: </strong>
              {minut90ProfileURL ? (
                <Link
                  href={minut90ProfileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  {minut90ProfileURL}
                </Link>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Profil Transfermarkt: </strong>
              {transfermarktProfileURL ? (
                <Link
                  href={transfermarktProfileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  {transfermarktProfileURL}
                </Link>
              ) : (
                '-'
              )}
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
