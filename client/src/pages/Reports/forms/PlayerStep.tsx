// MUI components
import { FormControl, Grid } from '@material-ui/core';
// Custom components
import { ExtraPlayerInfo } from './ExtraPlayerInfo';
import { PlayersCombo } from '../../../components/selects/PlayersCombo';
// Types
import { PlayerBasicInfo } from '../../../types/players';

type Props = {
  playersData: PlayerBasicInfo[];
  onAddPlayerClick: () => void;
};

export const PlayerStep = ({ playersData, onAddPlayerClick }: Props) => {
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
      <ExtraPlayerInfo />
    </Grid>
  );
};
