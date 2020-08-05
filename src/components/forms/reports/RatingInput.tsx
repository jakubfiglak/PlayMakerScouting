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
  TextFieldProps,
} from '@material-ui/core';
// Types
import { RatingScore } from '../../../types/reports';
// Utils & data
import { ratings } from '../../../data';

type RatingInputProps = {
  title: string;
  radioName: string;
  ratingValue: RatingScore;
  textFieldName: string;
  noteValue: string;
} & TextFieldProps;

export const RatingInput = ({
  title,
  radioName,
  ratingValue,
  textFieldName,
  noteValue,
  onChange,
}: RatingInputProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label={radioName}
            name={radioName}
            value={ratingValue}
            onChange={onChange}
          >
            {ratings.map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating.toString()}
                control={<Radio color="primary" />}
                label={rating}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={textFieldName}
          name={textFieldName}
          value={noteValue}
          onChange={onChange}
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
