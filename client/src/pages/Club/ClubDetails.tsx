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
import { Security as ClubsIcon } from '@material-ui/icons';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Club } from '../../types/clubs';
// Utils & data
import { getFlagEmoji, getCountryName } from '../../utils/countries';

type Props = {
  club: Club;
};

export const ClubDetails = ({ club }: Props) => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const isAdmin = user.role === 'admin';

  const { division, name, voivodeship, lnpID, country, group } = club;

  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="club avatar" className={classes.avatar}>
            <ClubsIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
        subheader={`${division}${group ? ` (${group})` : ''}`}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Kraj: </strong>
              {`${getFlagEmoji(country)} ${getCountryName(country)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Województwo: </strong>
              {voivodeship}
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
