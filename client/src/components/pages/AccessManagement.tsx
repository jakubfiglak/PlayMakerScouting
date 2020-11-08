import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { AccessManagementContent } from '../content';
import { PlayersState } from '../../context';
import { useAuthorization } from '../../hooks';

export const AccessManagement = () => {
  useAuthorization('/', 'admin');

  return (
    <PlayersState>
      <MainTemplate>
        <AccessManagementContent />
      </MainTemplate>
    </PlayersState>
  );
};
