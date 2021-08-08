import { Typography, Grid } from '@material-ui/core';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = Pick<Report, 'positionPlayed' | 'shirtNo'>;

export const ExtraPlayerInfo = ({ positionPlayed, shirtNo }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography>
          <strong>Pozycja w meczu: </strong>
          {getLabel(positionPlayed)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Numer na koszulce: </strong>
          {shirtNo || 'N/A'}
        </Typography>
      </Grid>
    </Grid>
  );
};
