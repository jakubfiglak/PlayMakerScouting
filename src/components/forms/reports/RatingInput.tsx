import React from 'react';
// MUI components
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
// Utils & data
import { ratings } from '../../../data';

export const RatingInput = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Skill title</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={1}
          >
            {ratings.map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating}
                control={<Radio color="primary" />}
                label={rating}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-flexible"
          fullWidth
          label="Opis"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
        />
      </Grid>
    </Grid>
  );
};
