import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// Custom components
import { Loader } from '../../components/Loader';
import { FormModal } from '../../components/FormModal';
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { AddMemberDTO } from '../../types/teams';
// Hooks
import { useUsersList } from '../../hooks/users';
import { useAddMember } from '../../hooks/teams';

type Props = {
  onClose: () => void;
  open: boolean;
  teamId: string;
};

export const AddMemberFormModal = ({ onClose, open, teamId }: Props) => {
  const { data: users, isLoading: usersLoading } = useUsersList();
  const { mutate: addMember, isLoading: addMemberLoading } = useAddMember(
    teamId,
  );

  const availableUsers = users
    ? users.filter((user) => user.role === 'scout' && !user.team)
    : [];

  return (
    <>
      {(usersLoading || addMemberLoading) && <Loader />}
      <Formik
        initialValues={{ memberId: '' }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          addMember(data);
          resetForm();
          onClose();
        }}
      >
        {({ handleSubmit }) => (
          <FormModal
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Dodaj nowego członka"
            acceptLabel="Dodaj"
          >
            <Form>
              <UsersCombo
                usersData={availableUsers}
                label="Użytkownik"
                id="memberId"
              />
            </Form>
          </FormModal>
        )}
      </Formik>
    </>
  );
};

const validationSchema: yup.ObjectSchema<AddMemberDTO> = yup
  .object({
    memberId: yup.string().required('Wybierz użytkownika'),
  })
  .defined();
