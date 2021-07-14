import { Button, makeStyles, Theme } from '@material-ui/core';

type Props = {
  label: string;
  isEditState: boolean;
  onCancelClick: () => void;
  goBack?: () => void;
  activeStep?: number;
  totalSteps?: number;
};

export const MainFormActions = ({
  label,
  isEditState,
  onCancelClick,
  goBack,
  activeStep,
  totalSteps,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button type="submit" fullWidth variant="contained" color="primary">
        {isEditState ? 'Zapisz zmiany' : `Dodaj ${label}`}
      </Button>
      {goBack && totalSteps && (
        <Button
          fullWidth
          variant="contained"
          color="default"
          onClick={goBack}
          disabled={activeStep !== totalSteps}
        >
          Wróć do edycji
        </Button>
      )}
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onCancelClick}
      >
        Anuluj
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },

    '& > * + *': {
      marginLeft: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(2),
      },
    },
  },
}));
