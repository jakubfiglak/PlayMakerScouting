import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Profile: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>User profile</h1>
    </MainTemplate>
  );
};

export default Profile;
