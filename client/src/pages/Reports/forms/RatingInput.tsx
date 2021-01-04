import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, Typography, TextField } from '@material-ui/core';
// Custom components
import { RatingSelect } from '../../../components/selects/RatingSelect';

type Props = {
  title: string;
  namespace: string;
  placeholder?: string;
};

export const RatingInput = ({ title, namespace, placeholder }: Props) => {
  const [field, meta] = useField(`${namespace}.note`);

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={4}>
        <RatingSelect name={`${namespace}.rating`} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...field}
          id={`${namespace}.note`}
          fullWidth
          placeholder={placeholder}
          label="Opis"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxLength: 400,
          }}
          error={touched && !!error}
          helperText={touched && error}
        />
      </Grid>
    </Grid>
  );
};
