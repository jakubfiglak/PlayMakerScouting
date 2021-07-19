import { Button, makeStyles, Theme } from '@material-ui/core';

type Props = {
  handleClearFilter: () => void;
};

export const FilterFormActions = ({ handleClearFilter }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        Zastosuj filtry
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClearFilter}
      >
        Wyczyść
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',

    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
