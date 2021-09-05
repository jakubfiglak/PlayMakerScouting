import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Cancel as CancelIcon } from '@material-ui/icons';
// Hooks
import { useAlertsState } from '../context/alerts/useAlertsState';

type Props = {
  linkTo: string;
  linkText: string;
  isEditState: boolean;
  isEditDisabled: boolean;
  onEditClick: () => void;
};

export const SingleAssetPageActions = ({
  linkTo,
  linkText,
  isEditState,
  isEditDisabled,
  onEditClick,
}: Props) => {
  const classes = useStyles();
  const { setAlert } = useAlertsState();

  function handleEditClick() {
    if (isEditState) {
      onEditClick();
      setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    }
    onEditClick();
  }

  return (
    <div className={classes.buttonsContainer}>
      <Button
        to={linkTo}
        component={RouterLink}
        variant="contained"
        color="primary"
      >
        {linkText}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={isEditState ? <CancelIcon /> : <EditIcon />}
        onClick={handleEditClick}
        disabled={isEditDisabled}
      >
        {isEditState ? 'Anuluj edycję' : 'Edytuj'}
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
    marginBottom: theme.spacing(1),
  },
}));
