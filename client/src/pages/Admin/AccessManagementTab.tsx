import React from 'react';
// MUI components
import {
  Typography,
  makeStyles,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Tabs,
  Tab,
  Fab,
} from '@material-ui/core';
// MUI icons
import {
  ExpandMore as AccordionIcon,
  Add as AddIcon,
} from '@material-ui/icons';
// Custom components
import { PageHeading } from '../../components/PageHeading';
import { GrantAccessForm } from './GrantAccessForm';

export const AccessManagementTab = () => {
  return (
    <>
      <PageHeading title="Zarządzanie dostępami" />
      <GrantAccessForm />
    </>
  );
};
