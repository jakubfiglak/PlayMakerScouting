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
import AddIcon from '@material-ui/icons/AddOutlined';
// Types
import { ClubBasicInfo } from '../../types/clubs';

type Props = {
  clubsData: ClubBasicInfo[];
  name: string;
  label: string;
  size?: 'medium' | 'small';
  addClubOption?: boolean;
  onAddClubClick?: () => void;
};

export const ClubsCombo = ({
  clubsData,
  name,
  label,
  size,
  addClubOption,
  onAddClubClick,
}: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id={name}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={['', ...clubsData.map((club) => club._id)]}
      getOptionLabel={(option) => {
        const club = clubsData.find((c) => c._id === option);
        if (club) {
          return club.name;
        }
        return 'brak';
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
        addClubOption
          ? (props: PaperProps) => (
              <Paper {...props}>
                <MenuItem>
                  <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={onAddClubClick}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    Dodaj nowy klub
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
