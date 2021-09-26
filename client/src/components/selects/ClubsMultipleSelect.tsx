import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { ClubBasicInfo } from '../../types/clubs';

type Props = {
  clubs: ClubBasicInfo[];
};

export const ClubsMultipleSelect = ({ clubs }: Props) => {
  return (
    <Field
      name="clubs"
      component={Autocomplete}
      multiple
      limitTags={2}
      options={clubs.map((club) => club.id)}
      disableCloseOnSelect
      getOptionLabel={(option: string) => getClubNameById(option, clubs)}
      renderOption={(club: string, { selected }: { selected: boolean }) => (
        <FormControlLabel
          control={
            <Field
              as={Checkbox}
              value={club}
              style={{ marginRight: 8 }}
              checked={selected}
              name="clubs"
            />
          }
          label={getClubNameById(club, clubs)}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} variant="outlined" label="Kluby" />
      )}
    />
  );
};

function getClubNameById(id: string, clubs: ClubBasicInfo[]) {
  const club = clubs.find((item) => item.id === id);
  if (club) {
    return club.name;
  }
  return 'nieznany klub';
}
