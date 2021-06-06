import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Checkbox, makeStyles, Theme } from '@material-ui/core';
import { Autocomplete } from 'formik-material-ui-lab';
// Custom components
import { UsersMultipleSelect } from '../../components/selects/UsersMultipleSelect';
import { Loader } from '../../components/Loader';
import { FormModal } from '../../components/FormModal';
// Types
import { Team, TeamDTO } from '../../types/teams';
import { User } from '../../types/auth';
import { UserBasicInfo } from '../../types/users';
// Hooks
import { useCreateRating } from '../../operations/mutations/useCreateRating';
import { useUpdateRating } from '../../operations/mutations/useUpdateRating';

type Props = {
  current: Team | null;
  onClose: () => void;
  open: boolean;
  users: UserBasicInfo[];
};

export const TeamsFormModal = ({ current, onClose, open, users }: Props) => {
  const classes = useStyles();
  const initialValues: TeamDTO = current
    ? getInitialStateFromCurrent(current)
    : ratingsFormInitialValues;

  const { mutate: createRating, isLoading: createLoading } = useCreateRating();
  const { mutate: updateRating, isLoading: updateLoading } = useUpdateRating();

  return (
    <>
      {(createLoading || updateLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          // if (current) {
          //   updateRating({ id: current.id, ratingData: data });
          // } else {
          //   createRating(data);
          // }
          console.log(data);
          resetForm();
          onClose();
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <FormModal
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={
              current ? `Edytuj cechę ${current.name}` : 'Dodaj nową cechę'
            }
            acceptLabel={current ? 'Zapisz zmiany' : 'Dodaj'}
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
                options={users.map((user) => user.id)}
                disableCloseOnSelect
                getOptionLabel={(selectedId: string) => {
                  const user = users.find((el) => el.id === selectedId);
                  if (user) {
                    const { firstName, lastName, email } = user;
                    return `${firstName} ${lastName} (${email})`;
                  }
                  return 'user not found';
                }}
                // getOptionLabel={(option) => option.email}
                renderOption={(
                  user: string,
                  { selected }: { selected: boolean },
                ) => (
                  <>
                    <Field
                      as={Checkbox}
                      // icon={icon}
                      // checkedIcon={checkedIcon}
                      value={user}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      name="members"
                    />
                    {user}
                  </>
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
            <p>{errors ? `${errors.members} ${errors.name}` : ''}</p>
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

function getInitialStateFromCurrent(current: Team): TeamDTO {
  const { id, members, createdAt, updatedAt, ...rest } = current;
  return { ...rest, members: members.map((user) => user.id) };
}

const ratingsFormInitialValues: TeamDTO = {
  name: '',
  members: [],
};

const validationSchema: yup.ObjectSchema<TeamDTO> = yup
  .object({
    name: yup
      .string()
      .max(30, 'Nazwa nie może być dłuższa niż 30 znaków')
      .required('Podaj nazwę'),
    members: yup.array<string>().required('Wybierz członków'),
  })
  .defined();
