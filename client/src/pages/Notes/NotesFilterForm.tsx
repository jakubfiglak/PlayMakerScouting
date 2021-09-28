import { Formik, Form } from 'formik';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { MatchesCombo } from '../../components/selects/MatchesCombo';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { PositionCombo } from '../../components/selects/PositionCombo';
import { FinalRatingSelect } from '../../components/selects/FinalRatingSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
import { AuthorRadioGroup } from '../../components/selects/AuthorRadioGroup';
// Types
import { PlayerBasicInfo } from '../../types/players';
import { ClubBasicInfo } from '../../types/clubs';
import { MatchBasicInfo } from '../../types/matches';
import { NotesFilterData } from '../../types/notes';

type Props = {
  clubsData: ClubBasicInfo[];
  playersData: PlayerBasicInfo[];
  matchesData: MatchBasicInfo[];
  filters: NotesFilterData;
  onFilter: (data: NotesFilterData) => void;
  onClearFilters: () => void;
};

export const NotesFilterForm = ({
  clubsData,
  playersData,
  matchesData,
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
                name="player"
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
              <MatchesCombo matchesData={matchesData} size="small" />
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
