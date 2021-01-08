import React from 'react';
import {
  AccountCircle as AccountIcon,
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assignment as OrdersIcon,
  Assessment as ReportsIcon,
  Settings as AccessManagementIcon,
} from '@material-ui/icons';

const account = {
  icon: <AccountIcon color="error" />,
  text: 'Mój profil',
  to: '/account',
};

const players = {
  icon: <PlayersIcon color="error" />,
  text: 'Zawodnicy',
  to: '/players',
};

const clubs = {
  icon: <ClubsIcon color="error" />,
  text: 'Kluby',
  to: '/clubs',
};

const orders = {
  icon: <OrdersIcon color="error" />,
  text: 'Zlecenia',
  to: '/orders',
};

const reports = {
  icon: <ReportsIcon color="error" />,
  text: 'Raporty',
  to: '/reports',
};

const accessManagement = {
  icon: <AccessManagementIcon color="error" />,
  text: 'Zarządzanie dostępami',
  to: '/accessmanagement',
};

export const scoutNavElements = [account, clubs, players, reports];

export const playmakerScoutNavElements = [
  account,
  clubs,
  players,
  orders,
  reports,
];

export const adminNavElements = [
  ...playmakerScoutNavElements,
  accessManagement,
];
