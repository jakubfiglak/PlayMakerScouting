import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { NoteBasicInfo } from '../../types/notes';

type Props = {
  notesData: NoteBasicInfo[];
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
      getOptionLabel={(option) => {
        const note = notesData.find((n) => n.id === option);
        if (note) {
          return `${
            note.player
              ? `${note.player.firstName} ${note.player.lastName}`
              : ''
          } (notatka nr ${note.docNumber})`;
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
    />
  );
};
