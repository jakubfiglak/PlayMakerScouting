import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { FormControl } from '@material-ui/core';
import { PositionSelect } from '../../components/selects/PositionSelect';
import { NoteDTO } from '../../types/notes';
import { PlayerBasicInfo } from '../../types/players';

type Props = { players: PlayerBasicInfo[] };

export const PositionPlayedSelect = ({ players }: Props) => {
  const { values, setFieldValue } = useFormikContext<NoteDTO>();

  useEffect(() => {
    if (values.player) {
      const selectedPlayer = players.find(
        (player) => player.id === values.player,
      );

      if (selectedPlayer) {
        setFieldValue('positionPlayed', selectedPlayer.position);
      }
    }
  }, [players, setFieldValue, values.player]);

  return (
    <FormControl variant="outlined" fullWidth>
      <PositionSelect
        name="positionPlayed"
        helperText="Podaj pozycję, na której zawodnik zagrał w danym meczu"
      />
    </FormControl>
  );
};
