import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { ClubBasicInfo } from '../../types/clubs';
import { MatchesFilterData } from '../../types/matches';

type Props = {
  clubsData: ClubBasicInfo[];
  filters: MatchesFilterData;
  onFilter: (data: MatchesFilterData) => void;
  onClearFilters: () => void;
};

export const MatchesFilterForm = ({
  clubsData,
  filters,
  onFilter,
  onClearFilters,
}: Props) => {
  return (
    <Formik
      initialValues={filters}
      enableReinitialize
      onSubmit={(data) => onFilter(data)}
    >
      {() => (
        <Form autoComplete="off">
          <FormContainer>
            <FormControl variant="outlined" size="small" fullWidth>
              <ClubsCombo
                clubsData={clubsData}
                label="Klub"
                size="small"
                name="club"
              />
            </FormControl>
            <Field
              name="afterDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label="Zakres dat - od"
              id="afterDate"
              size="small"
            />
            <Field
              name="beforeDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label="Zakres dat - do"
              id="beforeDate"
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
