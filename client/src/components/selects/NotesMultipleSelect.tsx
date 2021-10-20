import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Note } from '../../types/notes';
import { getNoteLabelById } from './utils';

type Props = {
  notes: Note[];
  getDisabledOptions: () => string[];
};

export const NotesMultipleSelect = ({ notes, getDisabledOptions }: Props) => {
  const disabledOptions = getDisabledOptions();

  return (
    <Field
      name="notes"
      component={Autocomplete}
      getOptionDisabled={(option: string) => disabledOptions.includes(option)}
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
