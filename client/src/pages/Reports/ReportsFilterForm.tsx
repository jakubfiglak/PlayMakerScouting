import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { ReportsFilterData } from '../../types/reports';
import { PlayerBasicInfo } from '../../types/players';

type FilterFormProps = {
  playersData: PlayerBasicInfo[];
  setFilters: Dispatch<SetStateAction<ReportsFilterData>>;
};

const initialFilters: ReportsFilterData = {
  player: '',
};

export const ReportsFilterForm = ({
  playersData,
  setFilters,
}: FilterFormProps) => {
  return (
    <Formik
      initialValues={initialFilters}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <FormContainer>
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
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
