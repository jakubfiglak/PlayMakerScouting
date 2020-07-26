import React from 'react';
// MUI components
import { Grid, Button } from '@material-ui/core';
// Styles
import { useStyles } from '../styles';

type FilterFormActionsProps = {
  handleClearFilter: () => void;
};

export const FilterFormActions = ({
  handleClearFilter,
}: FilterFormActionsProps) => {
  const classes = useStyles();

  return (
    <Grid container xs={12} sm={6} lg={3} className={classes.input} spacing={2}>
      <Grid item xs={6}>
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Filtruj
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClearFilter}
        >
          Wyczyść filtr
        </Button>
      </Grid>
    </Grid>
  );
};
