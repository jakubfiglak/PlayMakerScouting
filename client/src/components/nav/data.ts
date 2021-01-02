import AccountCircle from '@material-ui/icons/AccountCircle';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Security from '@material-ui/icons/Security';
import Assignment from '@material-ui/icons/Assignment';
import Assessment from '@material-ui/icons/Assessment';
import Settings from '@material-ui/icons/Settings';
import { NavLinkProps } from './types';

const accountElement: NavLinkProps = {
  Icon: AccountCircle,
  text: 'Mój profil',
  link: '/account',
};

const playersElement: NavLinkProps = {
  Icon: DirectionsRun,
  text: 'Zawodnicy',
  link: '/players',
};

const clubsElement: NavLinkProps = {
  Icon: Security,
  text: 'Kluby',
  link: '/clubs',
};

const ordersElement: NavLinkProps = {
  Icon: Assignment,
  text: 'Zlecenia',
  link: '/orders',
};

const reportsElement: NavLinkProps = {
  Icon: Assessment,
  text: 'Raporty',
  link: '/reports',
};

const accessManagementElement: NavLinkProps = {
  Icon: Settings,
  text: 'Zarządzanie dostępami',
  link: '/accessmanagement',
};

export const scoutNavElements = [
  accountElement,
  clubsElement,
  playersElement,
  reportsElement,
];
export const playmakerScoutNavElements = [
  accountElement,
  clubsElement,
  playersElement,
  ordersElement,
  reportsElement,
];
export const adminNavElements = [
  ...playmakerScoutNavElements,
  accessManagementElement,
];
