import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField } from '@material-ui/core';
// Custom components
import { SkillsCategorySelect } from '../../components/selects/SkillsCategorySelect';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
import { Checkbox } from '../../components/Checkbox';
import { Loader } from '../../components/Loader';
// Types
import { Rating, RatingDTO, SkillsCategories } from '../../types/ratings';
// Hooks
import { useCreateRating } from '../../operations/mutations/useCreateRating';
import { useUpdateRating } from '../../operations/mutations/useUpdateRating';

type Props = {
  current: Rating | null;
  clearCurrent: () => void;
  // onSubmit: (data: ClubsFormData) => void;
  // onCancelClick: () => void;
  // onEditCancelClick: () => void;
};

export const RatingsForm = ({ current, clearCurrent }: Props) => {
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
            clearCurrent();
          } else {
            createRating(data);
          }
          resetForm();
        }}
      >
        {({ errors, touched, handleReset }) => (
          <Form>
            <FormContainer>
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
              <MainFormActions
                label="cechę"
                isEditState={!!current}
                onCancelClick={clearCurrent}
                onEditCancelClick={clearCurrent}
              />
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

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
