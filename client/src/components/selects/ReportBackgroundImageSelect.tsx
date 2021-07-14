import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
// Types
import { ReportBackgroundImage } from '../../types/reportBackgroundImages';

type Props = {
  reportBackgroundImages: ReportBackgroundImage[];
  value: string;
  onChange: (url: string) => void;
};

export const ReportBackgroundImageSelect = ({
  reportBackgroundImages,
  value,
  onChange,
}: Props) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="reportBackgroundImage">Tło wydruku</InputLabel>
      <Select
        labelId="reportBackgroundImage"
        label="Tło wydruku"
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
      >
        <MenuItem value="">Brak</MenuItem>
        {reportBackgroundImages.map(({ id, name, url }) => (
          <MenuItem key={id} value={url}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
