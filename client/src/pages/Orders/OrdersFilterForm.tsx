import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { OrderStatusSelect } from '../../components/selects/OrderStatusSelect';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { OrdersFilterData } from '../../types/orders';
import { PlayerBasicInfo } from '../../types/players';

type Props = {
  playersData: PlayerBasicInfo[];
  filters: OrdersFilterData;
  onFilter: (data: OrdersFilterData) => void;
  onClearFilters: () => void;
};

export const OrdersFilterForm = ({
  playersData,
  filters,
  onFilter,
  onClearFilters,
}: Props) => {
  return (
    <Formik
      initialValues={filters}
      enableReinitialize
      onSubmit={(data) => onFilter(data)}
    >
      {() => (
        <Form autoComplete="off">
          <FormContainer>
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
            </FormControl>
            <OrderStatusSelect size="small" />
            <Field
              name="createdAfter"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label="Utworzone po"
              id="createdAfter"
              size="small"
            />
            <Field
              name="createdBefore"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label="Utworzone przed"
              id="createdBefore"
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
