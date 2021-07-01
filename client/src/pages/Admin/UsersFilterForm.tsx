import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { RoleSelect } from '../../components/selects/RoleSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { UserFilterData } from '../../types/users';

type Props = {
  setFilters: Dispatch<SetStateAction<UserFilterData>>;
};

export const UsersFilterForm = ({ setFilters }: Props) => {
  const initialFilterValues: UserFilterData = {
    lastName: '',
    voivodeship: '',
    city: '',
    role: '',
  };

  return (
    <Formik
      initialValues={initialFilterValues}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <FormContainer>
            <Field
              name="lastName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwisko"
              size="small"
            />
            <FormControl variant="outlined" size="small" fullWidth>
              <VoivodeshipSelect name="voivodeship" size="small" />
            </FormControl>
            <Field
              name="city"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Miasto"
              size="small"
            />
            <FormControl variant="outlined" size="small" fullWidth>
              <RoleSelect />
            </FormControl>
            <FilterFormActions
              handleClearFilter={() => {
                handleReset();
                setFilters(initialValues);
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
