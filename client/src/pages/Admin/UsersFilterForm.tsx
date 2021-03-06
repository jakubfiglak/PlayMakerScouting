import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { RoleSelect } from '../../components/selects/RoleSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { UserFilterData } from '../../types/users';

type Props = {
  filters: UserFilterData;
  onFilter: (data: UserFilterData) => void;
  onClearFilters: () => void;
};

export const UsersFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: Props) => {
  return (
    <Formik
      initialValues={filters}
      onSubmit={(data) => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <FormContainer>
            <Field
              name="lastName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwisko"
              size="small"
            />
            <FormControl variant="outlined" size="small" fullWidth>
              <VoivodeshipSelect name="voivodeship" size="small" />
            </FormControl>
            <Field
              name="city"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Miasto"
              size="small"
            />
            <FormControl variant="outlined" size="small" fullWidth>
              <RoleSelect />
            </FormControl>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
