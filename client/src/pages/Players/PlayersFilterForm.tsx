import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { PositionSelect } from '../../components/selects/PositionSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { PlayersFilterData } from '../../types/players';
import { ClubBasicInfo } from '../../types/clubs';

type Props = {
  clubsData: ClubBasicInfo[];
  setFilters: Dispatch<SetStateAction<PlayersFilterData>>;
};

export const PlayersFilterForm = ({ clubsData, setFilters }: Props) => {
  return (
    <Formik
      initialValues={{ lastName: '', club: '', position: '' }}
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
              <ClubsCombo
                clubsData={clubsData}
                name="club"
                label="Klub"
                size="small"
              />
            </FormControl>
            <FormControl variant="outlined" size="small" fullWidth>
              <PositionSelect />
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
