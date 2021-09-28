import { Field } from 'formik';
// MUI components
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type Props = { name?: string };

export const AuthorRadioGroup = ({ name = 'createdBy' }: Props) => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  return (
    <FormControl component="fieldset" size="small">
      <div className={classes.flex}>
        <FormLabel component="legend" className={classes.legend}>
          Pokaż
        </FormLabel>
        <Field component={RadioGroup} name={name}>
          <div className={classes.flex}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Wszystkie"
            />
            <FormControlLabel
              value={user.id}
              control={<Radio />}
              label="Tylko moje"
            />
          </div>
        </Field>
      </div>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  legend: {
    marginRight: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}));
