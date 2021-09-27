import { Field } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { ReportBasicInfo } from '../../types/reports';
import { getReportLabelById } from './utils';

type Props = {
  reports: ReportBasicInfo[];
  getDisabledOptions: () => string[];
};

export const ReportsMultipleSelect = ({
  reports,
  getDisabledOptions,
}: Props) => {
  const disabledOptions = getDisabledOptions();

  return (
    <Field
      name="reports"
      component={Autocomplete}
      getOptionDisabled={(option: string) => disabledOptions.includes(option)}
      multiple
      limitTags={2}
      options={reports.map((report) => report.id)}
      disableCloseOnSelect
      getOptionLabel={(option: string) => getReportLabelById(option, reports)}
      renderOption={(note: string, { selected }: { selected: boolean }) => (
        <FormControlLabel
          control={
            <Field
              as={Checkbox}
              value={note}
              style={{ marginRight: 8 }}
              checked={selected}
              name="reports"
            />
          }
          label={getReportLabelById(note, reports)}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} variant="outlined" label="Raporty" />
      )}
    />
  );
};
