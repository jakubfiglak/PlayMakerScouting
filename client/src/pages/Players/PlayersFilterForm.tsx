import React, { Dispatch, SetStateAction } from 'react';
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
  setFilters: Dispatch<SetStateAction<PlayersFilterData>>;
};

export const PlayersFilterForm = ({ clubsData, setFilters }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        lastName: '',
        club: '',
        position: '',
      }}
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      gap: theme.spacing(1),
    },
  }),
);
