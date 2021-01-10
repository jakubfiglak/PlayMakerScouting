import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../../components/selects/DivisionSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { ClubsFilterData } from '../../types/clubs';

type Props = {
  setFilters: Dispatch<SetStateAction<ClubsFilterData>>;
};

const initialFilters: ClubsFilterData = {
  name: '',
  division: '',
  voivodeship: '',
};

export const ClubsFilterForm = ({ setFilters }: Props) => {
  return (
    <Formik
      initialValues={initialFilters}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <FormContainer>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwa"
              size="small"
            />
            <DivisionSelect size="small" />
            <VoivodeshipSelect name="voivodeship" size="small" />
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
