import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { PositionSelect } from '../../components/selects/PositionSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
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
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwisko"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <ClubsCombo
                  clubsData={clubsData}
                  name="club"
                  label="Klub"
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <PositionSelect />
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
