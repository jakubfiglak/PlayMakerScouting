import React from 'react';
import {
  AccountCircle as AccountIcon,
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assignment as OrdersIcon,
  Assessment as ReportsIcon,
  Settings as AccessManagementIcon,
  Home as HomeIcon,
  HomeWork as ReportTemplatesIcon,
} from '@material-ui/icons';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    icon: <HomeIcon color="error" />,
    text: 'Strona główna',
    to: '/dashboard',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <AccountIcon color="error" />,
    text: 'Mój profil',
    to: '/account',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <ClubsIcon color="error" />,
    text: 'Kluby',
    to: '/clubs',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <PlayersIcon color="error" />,
    text: 'Zawodnicy',
    to: '/players',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <OrdersIcon color="error" />,
    text: 'Zlecenia',
    to: '/orders',
    allowedRoles: ['admin', 'playmaker-scout'],
  },
  {
    icon: <ReportTemplatesIcon color="error" />,
    text: 'Kreator szablonów',
    to: '/reporttemplates',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <ReportsIcon color="error" />,
    text: 'Raporty',
    to: '/reports',
    allowedRoles: ['admin', 'playmaker-scout', 'scout'],
  },
  {
    icon: <AccessManagementIcon color="error" />,
    text: 'Zarządzanie dostępami',
    to: '/accessmanagement',
    allowedRoles: ['admin'],
  },
];
