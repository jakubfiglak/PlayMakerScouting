import React from 'react';
import MainTemplate from '../../templates/MainTemplate';
import { AccessManagementContent } from '../../components/content';
import { useAuthorization } from '../../hooks';

export const AccessManagementPage = () => {
  useAuthorization('/', 'admin');

  return (
    <MainTemplate>
      <AccessManagementContent />
    </MainTemplate>
  );
};
