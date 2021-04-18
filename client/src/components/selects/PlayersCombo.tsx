import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  TextField,
  Paper,
  MenuItem,
  Button,
  Divider,
  PaperProps,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// MUI icons
import { Add as AddIcon } from '@material-ui/icons';
// Types
import { PlayerBasicInfo } from '../../types/players';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  playersData: PlayerBasicInfo[];
  label: string;
  size?: 'medium' | 'small';
  addPlayerOption?: boolean;
  onAddPlayerClick?: () => void;
};

export const PlayersCombo = ({
  playersData,
  label,
  size,
  addPlayerOption,
  onAddPlayerClick,
}: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField('player');

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id="player"
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={['', ...playersData.map((player) => player.id)]}
      getOptionLabel={(option) => {
        const player = playersData.find((p) => p.id === option);
        if (player) {
          const { lastName, firstName, club, position } = player;
          return `${firstName[0]}. ${lastName}, ${getLabel(position)} (${
            club.name
          })`;
        }
        return '';
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
      PaperComponent={
        addPlayerOption
          ? (props: PaperProps) => (
              <Paper {...props}>
                <MenuItem>
                  <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={onAddPlayerClick}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    Dodaj zawodnika
                  </Button>
                </MenuItem>
                <Divider />
                {props.children}
              </Paper>
            )
          : Paper
      }
    />
  );
};
