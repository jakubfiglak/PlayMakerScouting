import React from 'react';
// MUI components
import { Grid, Typography, TextField, FormControl } from '@material-ui/core';
// Custom components
import { RatingSelect } from '../selects';
// Types
import { RatingScore } from '../../../types/reports';
import { OnChangeFn } from '../../../types/common';

type RatingInputProps = {
  title: string;
  radioName: string;
  ratingValue: RatingScore;
  textFieldName: string;
  noteValue: string;
  onChange: OnChangeFn;
};

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
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth>
          <RatingSelect
            value={ratingValue}
            name={radioName}
            onChange={onChange}
          />
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
