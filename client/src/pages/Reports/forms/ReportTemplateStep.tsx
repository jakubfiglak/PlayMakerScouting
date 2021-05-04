import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
// MUI components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
// Types
import { ReportTemplate } from '../../../types/reportTemplates';

type Props = {
  selectedIndex: number;
  reportTemplates: ReportTemplate[];
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

export const ReportTemplateStep = ({
  selectedIndex,
  setSelectedIndex,
  reportTemplates,
}: Props) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedIndex(event.target.value as number);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="reportTemplate">Rodzaj raportu</InputLabel>
      <Select
        labelId="reportTemplate"
        id="reportTemplate"
        value={selectedIndex}
        renderValue={(value) => reportTemplates[value as number].name}
        onChange={handleChange}
        label="Szablon raportu"
      >
        {reportTemplates.map((template, idx) => (
          <MenuItem value={idx} key={template.name}>
            {template.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
