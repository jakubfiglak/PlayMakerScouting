import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { NoteBasicInfo } from '../../types/notes';
import { getNoteLabelById } from './utils';

type Props = {
  notes: NoteBasicInfo[];
};

export const NotesMultipleSelect = ({ notes }: Props) => {
  return (
    <Field
      name="notes"
      component={Autocomplete}
      multiple
      limitTags={2}
      options={notes.map((note) => note.id)}
      disableCloseOnSelect
      getOptionLabel={(option: string) => getNoteLabelById(option, notes)}
      renderOption={(note: string, { selected }: { selected: boolean }) => (
        <FormControlLabel
          control={
            <Field
              as={Checkbox}
              value={note}
              style={{ marginRight: 8 }}
              checked={selected}
              name="notes"
            />
          }
          label={getNoteLabelById(note, notes)}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} variant="outlined" label="Notatki" />
      )}
    />
  );
};
