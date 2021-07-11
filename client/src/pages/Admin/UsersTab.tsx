import React, { useState } from 'react';
// Custom components
import { UsersTable } from './UsersTable';
import { UsersFilterForm } from './UsersFilterForm';
import { AssignPlaymakerRoleConfirmationModal } from './AssignPlaymakerRoleConfirmationModal';
import { PageHeading } from '../../components/PageHeading';
// Types
import { UserFilterData } from '../../types/users';
import { User } from '../../types/auth';

export const UsersTab = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [
    isAssignPlaymakerRoleConfirmationModalOpen,
    setAssignPlaymakerRoleConfirmationModalOpen,
  ] = useState(false);

  const [filters, setFilters] = useState<UserFilterData>({
    lastName: '',
    voivodeship: '',
    city: '',
    role: '',
  });

  function handleAssignPlaymakerRoleClick(user: User) {
    setCurrentUser(user);
    setAssignPlaymakerRoleConfirmationModalOpen(true);
  }

  return (
    <>
      <PageHeading title="Użytkownicy" />
      <UsersFilterForm setFilters={setFilters} />
      <UsersTable
        filters={filters}
        onAssignRoleClick={handleAssignPlaymakerRoleClick}
      />
      <AssignPlaymakerRoleConfirmationModal
        user={currentUser}
        open={isAssignPlaymakerRoleConfirmationModalOpen}
        handleClose={() => {
          setAssignPlaymakerRoleConfirmationModalOpen(false);
        }}
      />
    </>
  );
};
