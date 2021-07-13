import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import {
  TextField,
  FormControl,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
// Custom components
import { PositionSelect } from '../../components/selects/PositionSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { YearOfBirthSelect } from '../../components/selects/YearOfBirthSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { PlayersFilterData } from '../../types/players';
import { ClubBasicInfo } from '../../types/clubs';

type Props = {
  clubsData: ClubBasicInfo[];
  filters: PlayersFilterData;
  onFilter: (data: PlayersFilterData) => void;
  onClearFilters: () => void;
};

export const PlayersFilterForm = ({
  clubsData,
  filters,
  onFilter,
  onClearFilters,
}: Props) => {
  const classes = useStyles();

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
            <div className={classes.container}>
              <YearOfBirthSelect
                name="bornAfter"
                label="Urodzeni po"
                size="small"
              />
              <YearOfBirthSelect
                name="bornBefore"
                label="Urodzeni przed"
                size="small"
              />
            </div>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      gap: theme.spacing(1),
    },
  }),
);
