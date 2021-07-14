import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { SkillsCategorySelect } from '../../components/selects/SkillsCategorySelect';
import { Checkbox } from '../../components/Checkbox';
import { Loader } from '../../components/Loader';
import { FormModal } from '../../components/FormModal';
// Types
import { Rating, RatingDTO, SkillsCategories } from '../../types/ratings';
// Hooks
import { useCreateRating, useUpdateRating } from '../../hooks/ratings';

type Props = {
  current: Rating | null;
  onClose: () => void;
  open: boolean;
};

export const RatingsFormModal = ({ current, onClose, open }: Props) => {
  const classes = useStyles();
  const initialValues: RatingDTO = current
    ? getInitialStateFromCurrent(current)
    : ratingsFormInitialValues;

  const { mutate: createRating, isLoading: createLoading } = useCreateRating();
  const { mutate: updateRating, isLoading: updateLoading } = useUpdateRating();

  return (
    <>
      {(createLoading || updateLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          if (current) {
            updateRating({ id: current.id, ratingData: data });
          } else {
            createRating(data);
          }
          resetForm();
          onClose();
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <FormModal
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={
              current ? `Edytuj cechę ${current.name}` : 'Dodaj nową cechę'
            }
            acceptLabel={current ? 'Zapisz zmiany' : 'Dodaj'}
          >
            <Form className={classes.container}>
              <SkillsCategorySelect />
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                name="shortName"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa skrócona"
                error={touched.shortName && !!errors.shortName}
                helperText={touched.shortName && errors.shortName}
              />
              <Checkbox name="score" label="Cecha oceniana punktowo" />
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

function getInitialStateFromCurrent(current: Rating): RatingDTO {
  const {
    id,
    author,
    private: isPrivate,
    createdAt,
    updatedAt,
    ...rest
  } = current;
  return rest;
}

const ratingsFormInitialValues: RatingDTO = {
  category: 'individual',
  name: '',
  shortName: '',
  score: true,
};

const validationSchema: yup.ObjectSchema<RatingDTO> = yup
  .object({
    category: yup.mixed<SkillsCategories>().required('Wybierz kategorię'),
    name: yup
      .string()
      .max(30, 'Nazwa nie może być dłuższa niż 30 znaków')
      .required('Podaj nazwę'),
    shortName: yup
      .string()
      .max(6, 'Nazwa skrócona nie może być dłuższa niż 6 znaków')
      .required('Podaj nazwę skróconą'),
    score: yup.boolean().required(),
  })
  .defined();
