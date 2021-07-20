import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';

export const VideoStep = () => {
  const [videoUrlField, videoUrlMeta] = useField('videoURL');
  const [videoDescriptionField, videoDescriptionMeta] = useField(
    'videoDescription',
  );

  const { error: urlError, touched: urlTouched } = videoUrlMeta;
  const {
    error: descriptionError,
    touched: descriptionTouched,
  } = videoDescriptionMeta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
