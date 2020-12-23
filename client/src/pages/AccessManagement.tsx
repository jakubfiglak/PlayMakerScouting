import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { AccessManagementContent } from '../components/content';
import { PlayersState, UsersState } from '../context';
import { useAuthorization } from '../hooks';

export const AccessManagement = () => {
  useAuthorization('/', 'admin');

  return (
    <PlayersState>
      <UsersState>
        <MainTemplate>
          <AccessManagementContent />
        </MainTemplate>
      </UsersState>
    </PlayersState>
  );
};
