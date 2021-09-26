import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { PlayerBasicInfo } from '../../types/players';

type Props = {
  players: PlayerBasicInfo[];
};

export const PlayersMultipleSelect = ({ players }: Props) => {
  return (
    <Field
      name="players"
      component={Autocomplete}
      multiple
      limitTags={2}
      options={players.map((player) => player.id)}
      disableCloseOnSelect
      getOptionLabel={(option: string) => getPlayerLabelById(option, players)}
      renderOption={(player: string, { selected }: { selected: boolean }) => (
        <FormControlLabel
          control={
            <Field
              as={Checkbox}
              value={player}
              style={{ marginRight: 8 }}
              checked={selected}
              name="players"
            />
          }
          label={getPlayerLabelById(player, players)}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} variant="outlined" label="Zawodnicy" />
      )}
    />
  );
};

function getPlayerLabelById(id: string, players: PlayerBasicInfo[]) {
  const player = players.find((item) => item.id === id);
  if (player) {
    return `${player.firstName} ${player.lastName} (${player.club.name})`;
  }
  return 'nieznany zawodnik';
}
