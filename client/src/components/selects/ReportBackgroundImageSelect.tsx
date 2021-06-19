import React, { Dispatch, SetStateAction } from 'react';
// MUI components
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
// Types
import { ReportBackgroundImage } from '../../types/reportBackgroundImages';

type Props = {
  reportBackgroundImages: ReportBackgroundImage[];
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const ReportBackgroundImageSelect = ({
  reportBackgroundImages,
  value,
  onChange,
}: Props) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel shrink id="reportBackgroundImage">
        Tło wydruku
      </InputLabel>
      <Select
        labelId="reportBackgroundImage"
        label="Tło wydruku"
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        displayEmpty
      >
        <MenuItem value="">Brak</MenuItem>
        {reportBackgroundImages.map(({ id, name, url }) => (
          <MenuItem key={id} value={url}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};