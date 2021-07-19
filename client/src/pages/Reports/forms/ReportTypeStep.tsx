import { Dispatch, SetStateAction, ChangeEvent } from 'react';
// MUI components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

type Props = {
  reportType: 'custom' | 'order';
  setReportType: Dispatch<SetStateAction<'order' | 'custom'>>;
  isOrderOptionDisabled: boolean;
  isPlayerOptionDisabled: boolean;
};

type ReportType = 'order' | 'custom';

export const ReportTypeStep = ({
  reportType,
  setReportType,
  isOrderOptionDisabled,
  isPlayerOptionDisabled,
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
        <MenuItem value="custom" disabled={isPlayerOptionDisabled}>
          Własny raport
        </MenuItem>
        <MenuItem value="order" disabled={isOrderOptionDisabled}>
          Raport na podstawie zlecenia
        </MenuItem>
      </Select>
    </FormControl>
  );
};
