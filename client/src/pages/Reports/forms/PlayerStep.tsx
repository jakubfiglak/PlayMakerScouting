import { useField } from 'formik';
// MUI components
import { FormControl, Grid, TextField } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../../components/selects/PlayersCombo';
// Types
import { PlayerBasicInfo } from '../../../types/players';
import { PositionSelect } from '../../../components/selects/PositionSelect';

type Props = {
  playersData: PlayerBasicInfo[];
  onAddPlayerClick: () => void;
};

export const PlayerStep = ({ playersData, onAddPlayerClick }: Props) => {
  const [shirtNoField, shirtNoMeta] = useField('shirtNo');
  const { error: shirtNoError, touched: shirtNoTouched } = shirtNoMeta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth>
          <PlayersCombo
            label="Zawodnik"
            playersData={playersData}
            addPlayerOption
            onAddPlayerClick={onAddPlayerClick}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth>
          <PositionSelect
            name="positionPlayed"
            helperText="Podaj pozycję, na której zawodnik zagrał w danym meczu"
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...shirtNoField}
          type="number"
          id="shirtNo"
          fullWidth
          label="Numer na koszulce"
          variant="outlined"
          error={shirtNoTouched && !!shirtNoError}
          helperText={shirtNoTouched && shirtNoError}
          InputProps={{ inputProps: { min: 1, max: 99 } }}
        />
      </Grid>
    </Grid>
  );
};
