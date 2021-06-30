import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTeam } from '../../hooks/teams';

type ParamTypes = {
  id: string;
};

export const TeamPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();

  const { id } = params;
  const { data, isLoading } = useTeam(id);

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <PageHeading title={`Zespół ${data?.name}`} />
      </div>
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
