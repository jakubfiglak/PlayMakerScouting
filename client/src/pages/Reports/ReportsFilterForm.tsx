import { Formik, Form } from 'formik';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { PositionCombo } from '../../components/selects/PositionCombo';
import { FinalRatingSelect } from '../../components/selects/FinalRatingSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
import { AuthorRadioGroup } from '../../components/selects/AuthorRadioGroup';
// Types
import { ReportsFilterData } from '../../types/reports';
import { PlayerBasicInfo } from '../../types/players';
import { ClubBasicInfo } from '../../types/clubs';

type Props = {
  playersData: PlayerBasicInfo[];
  clubsData: ClubBasicInfo[];
  filters: ReportsFilterData;
  onFilter: (data: ReportsFilterData) => void;
  onClearFilters: () => void;
};

export const ReportsFilterForm = ({
  playersData,
  clubsData,
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
            <AuthorRadioGroup />
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
            </FormControl>
            <FormControl variant="outlined" size="small" fullWidth>
              <PositionCombo size="small" />
            </FormControl>
            <FormControl variant="outlined" size="small" fullWidth>
              <ClubsCombo
                clubsData={clubsData}
                name="club"
                label="Klub"
                size="small"
              />
            </FormControl>
            <FormControl variant="outlined" size="small" fullWidth>
              <FinalRatingSelect />
            </FormControl>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
