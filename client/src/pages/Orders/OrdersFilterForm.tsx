import { Formik, Form, Field } from 'formik';
// MUI components
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
// Custom components
import { OrderStatusSelect } from '../../components/selects/OrderStatusSelect';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
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
  const classes = useStyles();
  const user = useAuthenticatedUser();

  return (
    <Formik
      initialValues={filters}
      enableReinitialize
      onSubmit={(data) => onFilter(data)}
    >
      {({ values }) => (
        <Form autoComplete="off">
          <FormContainer>
            <FormControl component="fieldset" size="small">
              <div className={classes.flex}>
                <FormLabel component="legend" className={classes.legend}>
                  Pokaż
                </FormLabel>
                <Field component={RadioGroup} name="scout">
                  <div className={classes.flex}>
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="Wszystkie"
                    />
                    <FormControlLabel
                      value={user.id}
                      control={<Radio />}
                      label="Moje"
                    />
                  </div>
                </Field>
              </div>
            </FormControl>
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
            </FormControl>
            <OrderStatusSelect
              size="small"
              isOpenOptionDisabled={values.scout !== 'all'}
            />
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

const useStyles = makeStyles((theme: Theme) => ({
  legend: {
    marginRight: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}));
