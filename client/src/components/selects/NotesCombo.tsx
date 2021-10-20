import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { Note } from '../../types/notes';
// Utils & data
import { getNoteLabelById } from './utils';

type Props = {
  notesData: Note[];
  name: string;
  label: string;
  size?: 'medium' | 'small';
};

export const NotesCombo = ({ notesData, name, label, size }: Props) => {
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
      options={['', ...notesData.map((note) => note.id)]}
      getOptionLabel={(option) => getNoteLabelById(option, notesData)}
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
    />
  );
};
