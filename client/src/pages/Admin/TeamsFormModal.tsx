import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import {
  TextField,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Autocomplete } from 'formik-material-ui-lab';
// Custom components
import { Loader } from '../../components/Loader';
import { FormModal } from '../../components/FormModal';
// Types
import { TeamDTO } from '../../types/teams';
import { UserBasicInfo } from '../../types/users';
// Hooks
import { useUsersList } from '../../hooks/users';
import { useCreateTeam } from '../../hooks/teams';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const TeamsFormModal = ({ onClose, open }: Props) => {
  const classes = useStyles();

  const { mutate: createTeam, isLoading: createTeamLoading } = useCreateTeam();
  const { data: users, isLoading: usersLoading } = useUsersList();

  const availableUsers = users
    ? users.filter((user) => user.role === 'scout' && !user.team)
    : [];

  return (
    <>
      {(usersLoading || createTeamLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          createTeam(data);
          resetForm();
          onClose();
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <FormModal
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Dodaj nowy zespół"
            acceptLabel="Dodaj"
          >
            <Form className={classes.container}>
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                name="members"
                component={Autocomplete}
                multiple
                options={availableUsers.map((user) => user.id)}
                disableCloseOnSelect
                getOptionLabel={(selectedId: string) =>
                  getUsernameById(selectedId, availableUsers)
                }
                renderOption={(
                  user: string,
                  { selected }: { selected: boolean },
                ) => (
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        value={user}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        name="members"
                      />
                    }
                    label={getUsernameById(user, availableUsers)}
                  />
                )}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Użytkownicy"
                    placeholder="Dodaj użytkowników"
                  />
                )}
              />
            </Form>
          </FormModal>
        )}
      </Formik>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));

const initialValues: TeamDTO = { name: '', members: [] };

function getUsernameById(id: string, users: UserBasicInfo[]) {
  const user = users.find((el) => el.id === id);
  if (user) {
    const { firstName, lastName, email } = user;
    return `${firstName} ${lastName} (${email})`;
  }
  return 'user not found';
}

const validationSchema: yup.ObjectSchema<TeamDTO> = yup
  .object({
    name: yup
      .string()
      .max(30, 'Nazwa nie może być dłuższa niż 30 znaków')
      .required('Podaj nazwę'),
    members: yup.array<string>().required('Wybierz członków'),
  })
  .defined();
