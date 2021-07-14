import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
  Checkbox as MUICheckbox,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { Loader } from '../../components/Loader';
import { FormModal } from '../../components/FormModal';
// Types
import { ReportTemplate, ReportTemplateDTO } from '../../types/reportTemplates';
// Hooks
import { useRatings } from '../../hooks/ratings';
import {
  useCreateReportTemplate,
  useUpdateReportTemplate,
} from '../../hooks/reportTemplates';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  current: ReportTemplate | null;
  onClose: () => void;
  open: boolean;
};

export const ReportTemplatesFormModal = ({ current, onClose, open }: Props) => {
  const classes = useStyles();
  const { data: ratings } = useRatings();
  const {
    mutate: createTemplate,
    isLoading: createLoading,
  } = useCreateReportTemplate();
  const {
    mutate: updateTemplate,
    isLoading: updateLoading,
  } = useUpdateReportTemplate();

  const initialValues: ReportTemplateDTO = current
    ? getInitialStateFromCurrent(current)
    : ratingsFormInitialValues;

  return (
    <>
      {(createLoading || updateLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          if (current) {
            updateTemplate({ id: current.id, templateData: data });
          } else {
            createTemplate(data);
          }
          resetForm();
          onClose();
        }}
      >
        {({ errors, touched, handleSubmit, values }) => (
          <FormModal
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={
              current ? `Edytuj szablon ${current.name}` : 'Dodaj nowy szablon'
            }
            acceptLabel={current ? 'Zapisz zmiany' : 'Dodaj'}
          >
            <Form className={classes.container}>
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                autoFocus
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                name="maxRatingScore"
                as={TextField}
                variant="outlined"
                type="number"
                fullWidth
                label="Ocena maksymalna"
                error={touched.maxRatingScore && !!errors.maxRatingScore}
                helperText={touched.maxRatingScore && errors.maxRatingScore}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Oceniane umiejętności</FormLabel>
                <FormGroup>
                  {ratings
                    ? ratings.map((rating) => (
                        <FormControlLabel
                          key={rating.id}
                          control={
                            <Field
                              as={MUICheckbox}
                              name="ratings"
                              value={rating.id}
                              checked={values.ratings.includes(rating.id)}
                              color="primary"
                            />
                          }
                          label={`${rating.name} (${getLabel(
                            rating.category,
                          )})`}
                        />
                      ))
                    : null}
                </FormGroup>
                {errors.ratings && touched.ratings ? (
                  <FormHelperText>{errors.ratings}</FormHelperText>
                ) : null}
              </FormControl>
            </Form>
          </FormModal>
        )}
      </Formik>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));

function getInitialStateFromCurrent(
  current: ReportTemplate,
): ReportTemplateDTO {
  const {
    id,
    author,
    ratings,
    createdAt,
    updatedAt,
    private: isPrivate,
    ...rest
  } = current;
  const ratingsIds = ratings.map((rating) => rating.id);
  return { ...rest, ratings: ratingsIds };
}

const ratingsFormInitialValues: ReportTemplateDTO = {
  name: '',
  maxRatingScore: 2,
  ratings: [],
};

const validationSchema: yup.ObjectSchema<ReportTemplateDTO> = yup
  .object({
    name: yup
      .string()
      .max(30, 'Nazwa nie może być dłuższa niż 30 znaków')
      .required('Podaj nazwę'),
    maxRatingScore: yup
      .number()
      .min(2, 'Maksymalna ocena musi być większa lub równa 2')
      .max(10, 'Maksymalna ocena musi być mniejsza lub równa 10')
      .required(),
    ratings: yup.array<string>().required('Wybierz oceniane umiejętności'),
  })
  .defined();
