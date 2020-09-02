import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { ClubData } from '../../../types/simplifiedData';

type ClubsComboProps = {
  clubsData: ClubData[];
  setFormData: Dispatch<SetStateAction<any>>;
  value: string;
  id: string;
  label: string;
  size?: 'medium' | 'small';
};

export const ClubsCombo = ({
  clubsData,
  value,
  setFormData,
  id,
  label,
  size,
}: ClubsComboProps) => {
  return (
    <Autocomplete
      id={id}
      onChange={(_: any, newValue: string | null) => {
        setFormData((prevData: any) => ({
          ...prevData,
          [id]: newValue,
        }));
      }}
      value={value}
      options={clubsData.map((club) => club._id)}
      getOptionLabel={(option) => {
        const club = clubsData.find((c) => c._id === option);
        if (club) {
          return club.name;
        }
        return '';
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" name={id} />
      )}
      size={size}
    />
  );
};
