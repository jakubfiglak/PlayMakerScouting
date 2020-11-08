import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { AccessManagementContent } from '../content';
import { PlayersState, UsersState } from '../../context';
import { useAuthorization } from '../../hooks';

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
