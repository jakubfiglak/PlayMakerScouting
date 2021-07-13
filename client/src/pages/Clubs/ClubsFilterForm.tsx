import React from 'react';
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
  filters: ClubsFilterData;
  onFilter: (data: ClubsFilterData) => void;
  onClearFilters: () => void;
};

export const ClubsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: Props) => {
  return (
    <Formik
      initialValues={filters}
      onSubmit={(data) => onFilter(data)}
      enableReinitialize
    >
      {() => (
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
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
