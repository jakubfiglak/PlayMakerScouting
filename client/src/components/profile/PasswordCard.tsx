import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useStyles } from './styles';
import { UpdatePasswordForm } from '../forms';

export const PasswordCard = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title="Zresetuj hasło"
        component="h3"
        className={classes.header}
      />
      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
};
