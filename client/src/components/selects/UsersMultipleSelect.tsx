import React from 'react';
import { useField } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { UserBasicInfo } from '../../types/users';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = { users: UserBasicInfo[] };

export const UsersMultipleSelect = ({ users }: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField<string[]>({
    name: 'members',
    multiple: true,
  });

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      multiple
      id="members"
      options={users.map((user) => user.id)}
      disableCloseOnSelect
      getOptionLabel={(selectedId) => {
        const user = users.find((el) => el.id === selectedId);
        if (user) {
          const { firstName, lastName, email } = user;
          return `${firstName} ${lastName} (${email})`;
        }
        return 'user not found';
      }}
      // getOptionLabel={(option) => option.email}
      renderOption={(user, { selected }) => (
        <>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            name="members"
          />
          {user}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          variant="outlined"
          label="Użytkownicy"
          placeholder="Dodaj użytkowników"
        />
      )}
    />
  );
};
