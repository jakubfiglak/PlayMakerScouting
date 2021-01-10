import React from 'react';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';

type Props = {
  handleClearFilter: () => void;
};

export const FilterFormActions = ({ handleClearFilter }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        Filtruj
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClearFilter}
      >
        Wyczyść filtr
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    gap: `${theme.spacing(2)}px`,
  },
}));
