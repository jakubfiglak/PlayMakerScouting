import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import UserCard from '../UserCard/UserCard';
import SectionTitle from '../SectionTitle/SectionTitle';
import useAuthState from '../../context/auth/useAuthState';

const Profile: React.FC = () => {
  useAuthorization();
  const authContext = useAuthState();

  const { user } = authContext;

  return (
    <MainTemplate>
      <SectionTitle>Mój profil</SectionTitle>
      <UserCard user={user} />
    </MainTemplate>
  );
};

export default Profile;
