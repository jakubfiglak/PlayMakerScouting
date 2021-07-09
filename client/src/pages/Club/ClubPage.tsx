import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ClubDetails } from './ClubDetails';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useClub } from '../../hooks/clubs';

type ParamTypes = {
  id: string;
};

export const ClubPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();

  const { id } = params;

  const { data: club, isLoading } = useClub(id);

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/players"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy klubów
        </Button>
        <PageHeading title="Profil klubu" />
      </div>
      {club ? <ClubDetails club={club} /> : null}
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginBottom: theme.spacing(1),
  },
}));
