import React, { useState } from 'react';
// Custom components
import { UsersTable } from './UsersTable';
import { UsersFilterForm } from './UsersFilterForm';
import { ChangeRoleConfirmationModal } from './ChangeRoleConfirmationModal';
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

  function handleChangeRoleClick(user: User) {
    setCurrentUser(user);
    setAssignPlaymakerRoleConfirmationModalOpen(true);
  }

  function getRoleToAssign(user: User | null) {
    if (user) {
      return user.role === 'playmaker-scout' ? 'scout' : 'playmaker-scout';
    }
    return 'playmaker-scout';
  }

  return (
    <>
      <PageHeading title="Użytkownicy" />
      <UsersFilterForm setFilters={setFilters} />
      <UsersTable filters={filters} onAssignRoleClick={handleChangeRoleClick} />
      <ChangeRoleConfirmationModal
        user={currentUser}
        open={isAssignPlaymakerRoleConfirmationModalOpen}
        handleClose={() => {
          setCurrentUser(null);
          setAssignPlaymakerRoleConfirmationModalOpen(false);
        }}
        roleToAssign={getRoleToAssign(currentUser)}
      />
    </>
  );
};
