import React from 'react';
// MUI components
import {
  Avatar,
  Card,
  CardHeader,
  Typography,
  makeStyles,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardContent,
} from '@material-ui/core';
// MUI icons
import { ExpandMore as AccordionIcon } from '@material-ui/icons';
// Custom components
import { EditAccountForm } from './EditAccountForm';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { Loader } from '../../components/Loader';
// Hooks
import { useAlert } from '../../hooks/useAlert';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useAuthState } from '../../context/auth/useAuthState';
// Utils & data
import { errorLabels, messageLabels } from '../../data';
import { getLabel } from '../../utils';

export const ProfilePage = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const {
    error,
    clearErrors,
    message,
    clearMessage,
    editDetails,
    updatePassword,
    loading,
  } = useAuthState();

  useAlert(getLabel(error, errorLabels), 'error', clearErrors);
  useAlert(getLabel(message, messageLabels), 'success', clearMessage);

  const { firstName, lastName, role, email } = user;

  return (
    <>
      {loading && <Loader />}
      <Typography
        variant="h6"
        component="h2"
        align="center"
        className={classes.header}
      >
        Profil użytkownika
      </Typography>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {`${firstName[0]}${lastName[0]}`}
            </Avatar>
          }
          title={`${firstName} ${lastName} (${role})`}
          subheader={`${email}`}
        />
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<AccordionIcon />}
              aria-controls="edit-profile-content"
              id="edit-profile-header"
            >
              <Typography className={classes.accordionTitle}>
                Edytuj profil
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EditAccountForm user={user} onSubmit={editDetails} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AccordionIcon />}
              aria-controls="update-password-content"
              id="update-password-header"
            >
              <Typography className={classes.accordionTitle}>
                Zmień hasło
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UpdatePasswordForm onSubmit={updatePassword} />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
}));
