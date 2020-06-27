import React from 'react';
import { Grid } from '@material-ui/core';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import DetailsCard from '../profile/DetailsCard';
import PasswordCard from '../profile/PasswordCard';
import SectionTitle from '../SectionTitle/SectionTitle';
import useAuthState from '../../context/auth/useAuthState';

const Profile: React.FC = () => {
  useAuthorization();
  const authContext = useAuthState();

  const { user } = authContext;

  return (
    <MainTemplate>
      <SectionTitle>Mój profil</SectionTitle>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={12}>
          <DetailsCard user={user} />
        </Grid>
        <Grid item lg={6} sm={12}>
          <PasswordCard />
        </Grid>
      </Grid>
    </MainTemplate>
  );
};

export default Profile;
