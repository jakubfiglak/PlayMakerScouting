import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { ReportBasicInfo } from '../../types/reports';

type Props = {
  reportsData: ReportBasicInfo[];
  name: string;
  label: string;
  size?: 'medium' | 'small';
};

export const ReportsCombo = ({ reportsData, name, label, size }: Props) => {
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
      options={['', ...reportsData.map((report) => report.id)]}
      getOptionLabel={(option) => {
        const report = reportsData.find((r) => r.id === option);
        if (report) {
          return `${report.player.firstName} ${report.player.lastName} (raport nr ${report.docNumber})`;
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
