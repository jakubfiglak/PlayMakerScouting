import React from 'react';
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
} from '@material-ui/core';
// Custom components
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { ReportTemplate, ReportTemplateDTO } from '../../types/reportTemplates';
import { useRatings } from '../../operations/queries/useRatings';

type Props = {
  current: ReportTemplate | null;
  // onSubmit: (data: ClubsFormData) => void;
  // onCancelClick: () => void;
  // onEditCancelClick: () => void;
};

export const ReportTemplatesForm = ({ current }: Props) => {
  const { data: ratings } = useRatings();

  const initialValues: ReportTemplateDTO = current
    ? getInitialStateFromCurrent(current)
    : ratingsFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      {({ errors, touched, handleReset, values }) => (
        <Form>
          <FormContainer>
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
                        label={`${rating.name} (${rating.category})`}
                      />
                    ))
                  : null}
              </FormGroup>
              {errors.ratings && touched.ratings ? (
                <FormHelperText>{errors.ratings}</FormHelperText>
              ) : null}
            </FormControl>
            <MainFormActions
              label="szablon"
              isEditState={!!current}
              onCancelClick={() => console.log('cancel')}
              onEditCancelClick={() => console.log('cancel')}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

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
