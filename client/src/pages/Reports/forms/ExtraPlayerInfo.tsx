import { useField } from 'formik';
// MUI components
import { FormControl, Grid, TextField } from '@material-ui/core';
// Types
import { PositionSelect } from '../../../components/selects/PositionSelect';

export const ExtraPlayerInfo = () => {
  const [shirtNoField, shirtNoMeta] = useField('shirtNo');
  const { error: shirtNoError, touched: shirtNoTouched } = shirtNoMeta;

  return (
    <>
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <PositionSelect
            name="positionPlayed"
            helperText="Podaj pozycję, na której zawodnik zagrał w danym meczu"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          {...shirtNoField}
          type="number"
          id="shirtNo"
          fullWidth
          label="Numer na koszulce"
          variant="outlined"
          error={shirtNoTouched && !!shirtNoError}
          helperText={shirtNoTouched && shirtNoError}
          InputProps={{ inputProps: { min: 1, max: 99 } }}
        />
      </Grid>
    </>
  );
};
