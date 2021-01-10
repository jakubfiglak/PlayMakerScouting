import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, FormControl } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
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
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <PlayersCombo
                  playersData={playersData}
                  label="Zawodnik"
                  size="small"
                />
              </FormControl>
            </Grid>
            <FilterFormActions
              handleClearFilter={() => {
                handleReset();
                setFilters(initialValues);
              }}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
