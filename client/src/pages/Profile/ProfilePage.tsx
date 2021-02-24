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
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useAuthState } from '../../context/auth/useAuthState';

export const ProfilePage = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const { editDetails, updatePassword, loading } = useAuthState();

  const { firstName, lastName, role, email } = user;

  return (
    <MainTemplate>
      {loading && <Loader />}
      <PageHeading title="Profil użytkownika" />
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
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: theme.palette.error.main,
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
}));
