import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { CompetitionSelect } from '../../../components/selects/CompetitionSelect';
import { MatchLocationSelect } from '../../../components/selects/MatchLocationSelect';

export const MatchStep = () => {
  const [againstField, againstMeta] = useField('match.against');
  const [dateField, dateMeta] = useField('match.date');
  const [resultField, resultMeta] = useField('match.result');
  const [videoUrlField, videoUrlMeta] = useField('videoURL');
  const [videoDescriptionField, videoDescriptionMeta] = useField(
    'videoDescription',
  );

  const { error: againstError, touched: againstTouched } = againstMeta;
  const { error: dateError, touched: dateTouched } = dateMeta;
  const { error: resultError, touched: resultTouched } = resultMeta;
  const { error: urlError, touched: urlTouched } = videoUrlMeta;
  const {
    error: descriptionError,
    touched: descriptionTouched,
  } = videoDescriptionMeta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CompetitionSelect name="match.competition" />
      </Grid>
      <Grid item xs={6}>
        <MatchLocationSelect name="match.location" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...againstField}
          id="against"
          fullWidth
          label="Przeciwnik"
          variant="outlined"
          error={againstTouched && !!againstError}
          helperText={againstTouched && againstError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...dateField}
          type="datetime-local"
          id="date"
          fullWidth
          label="Data"
          variant="outlined"
          error={dateTouched && !!dateError}
          helperText={dateTouched && dateError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...resultField}
          id="result"
          fullWidth
          label="Wynik"
          variant="outlined"
          error={resultTouched && !!resultError}
          helperText={resultTouched && resultError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          {...videoUrlField}
          variant="outlined"
          fullWidth
          id="videoURL"
          label="Link do video"
          error={urlTouched && !!urlError}
          helperText={urlTouched && urlError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          {...videoDescriptionField}
          variant="outlined"
          fullWidth
          multiline
          id="videoDescription"
          label="Opis video"
          error={descriptionTouched && !!descriptionError}
          helperText={descriptionTouched && descriptionError}
        />
      </Grid>
    </Grid>
  );
};
