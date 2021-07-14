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

type Props = {
  playersData: PlayerBasicInfo[];
  filters: ReportsFilterData;
  onFilter: (data: ReportsFilterData) => void;
  onClearFilters: () => void;
};

export const ReportsFilterForm = ({
  playersData,
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
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
            </FormControl>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
