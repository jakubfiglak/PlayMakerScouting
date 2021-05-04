import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
// Utils & data
import { skillsCategories } from '../../utils/constants';
import { getLabel } from '../../utils/getLabel';

type Props = { name?: string; label?: string; helperText?: string };

export const SkillsCategorySelect = ({
  name = 'category',
  label = 'Kategoria',
  helperText,
}: Props) => {
  const [field, fieldMeta] = useField(name);

  const { error, touched } = fieldMeta;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        {...field}
        labelId={name}
        id={name}
        label={label}
        error={touched && !!error}
      >
        {skillsCategories.map((category) => (
          <MenuItem value={category} key={category}>
            {getLabel(category)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
