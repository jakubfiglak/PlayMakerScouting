import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import UserCard from '../UserCard/UserCard';
import useAuthState from '../../context/auth/useAuthState';
import RegisterForm from '../auth/RegisterForm';

const Profile: React.FC = () => {
  useAuthorization();
  const authContext = useAuthState();

  const { user } = authContext;

  return (
    <MainTemplate>
      <UserCard user={user} />
    </MainTemplate>
  );
};

export default Profile;
