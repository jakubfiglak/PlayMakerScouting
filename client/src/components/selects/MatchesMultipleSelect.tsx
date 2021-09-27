import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { MatchBasicInfo } from '../../types/matches';
import { formatDate } from '../../utils/dates';

type Props = {
  matches: MatchBasicInfo[];
  getDisabledOptions: () => string[];
};

export const MatchesMultipleSelect = ({
  matches,
  getDisabledOptions,
}: Props) => {
  const disabledOptions = getDisabledOptions();

  return (
    <Field
      name="matches"
      component={Autocomplete}
      getOptionDisabled={(option: string) => disabledOptions.includes(option)}
      multiple
      limitTags={2}
      options={matches.map((match) => match.id)}
      disableCloseOnSelect
      getOptionLabel={(option: string) => getMatchLabelById(option, matches)}
      renderOption={(match: string, { selected }: { selected: boolean }) => (
        <FormControlLabel
          control={
            <Field
              as={Checkbox}
              value={match}
              style={{ marginRight: 8 }}
              checked={selected}
              name="matches"
            />
          }
          label={getMatchLabelById(match, matches)}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} variant="outlined" label="Mecze" />
      )}
    />
  );
};

function getMatchLabelById(id: string, matches: MatchBasicInfo[]) {
  const match = matches.find((item) => item.id === id);
  if (match) {
    return `${match.homeTeam.name} - ${match.awayTeam.name} (${formatDate(
      match.date,
    )})`;
  }
  return 'nieznany mecz';
}
