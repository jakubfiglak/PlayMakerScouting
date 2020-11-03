import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
// MUI components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

type Props = {
  reportType: 'custom' | 'order';
  setReportType: Dispatch<SetStateAction<'order' | 'custom'>>;
  userRole?: 'admin' | 'playmaker-scout' | 'scout';
};

type ReportType = 'order' | 'custom';

export const ReportTypeStep = ({
  reportType,
  setReportType,
  userRole,
}: Props) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setReportType(event.target.value as ReportType);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="reportType">Rodzaj raportu</InputLabel>
      <Select
        labelId="reportType"
        id="reportType"
        value={reportType}
        onChange={handleChange}
        label="Rodzaj raportu"
      >
        <MenuItem value="custom">Własny raport</MenuItem>
        <MenuItem value="order" disabled={userRole === 'scout'}>
          Raport na podstawie zlecenia
        </MenuItem>
      </Select>
    </FormControl>
  );
};
