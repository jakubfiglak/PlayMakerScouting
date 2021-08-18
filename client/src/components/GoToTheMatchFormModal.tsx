import { Formik, Form } from 'formik';
import * as yup from 'yup';
// Custom components
import { FormModal } from './FormModal';
import { MatchesCombo } from './selects/MatchesCombo';
// Types
import { GoToTheMatchDTO } from '../types/users';
import { MatchBasicInfo } from '../types/matches';

type Props = {
  matchesData: MatchBasicInfo[];
  onSubmit: (data: GoToTheMatchDTO) => void;
  onClose: () => void;
  open: boolean;
};

export const GoToTheMatchFormModal = ({
  matchesData,
  onSubmit,
  onClose,
  open,
}: Props) => {
  return (
    <Formik
      initialValues={{ match: '' }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
        onClose();
      }}
    >
      {({ handleSubmit }) => (
        <FormModal
          open={open}
          onClose={onClose}
          onSubmit={handleSubmit}
          title="Jedź na mecz"
          acceptLabel="Jedź"
        >
          <Form>
            <MatchesCombo matchesData={matchesData} />
          </Form>
        </FormModal>
      )}
    </Formik>
  );
};

const validationSchema: yup.ObjectSchema<GoToTheMatchDTO> = yup
  .object({
    match: yup.string().required('Wybierz mecz'),
  })
  .defined();
