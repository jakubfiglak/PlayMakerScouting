import React from 'react';
// MUI components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
// Types
import { ReportTemplate } from '../../types/reportTemplates';

type Props = {
  value: string;
  reportTemplates: ReportTemplate[];
  onChange: (id: string) => void;
};

export const ReportTemplatesSelect = ({
  value,
  onChange,
  reportTemplates,
}: Props) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="reportTemplate">Szablon raportu</InputLabel>
      <Select
        labelId="reportTemplate"
        id="reportTemplate"
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        label="Szablon raportu"
      >
        {reportTemplates.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
