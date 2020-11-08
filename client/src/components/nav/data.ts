import AccountCircle from '@material-ui/icons/AccountCircle';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Security from '@material-ui/icons/Security';
import SportsSoccer from '@material-ui/icons/SportsSoccer';
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

const matchesElement: NavLinkProps = {
  Icon: SportsSoccer,
  text: 'Mecze',
  link: '/matches',
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
  playersElement,
  clubsElement,
  matchesElement,
  reportsElement,
];
export const playmakerScoutNavElements = [
  accountElement,
  playersElement,
  clubsElement,
  matchesElement,
  ordersElement,
  reportsElement,
];
export const adminNavElements = [
  ...playmakerScoutNavElements,
  accessManagementElement,
];

export const basicNavElements: NavLinkProps[] = [
  {
    Icon: AccountCircle,
    text: 'Mój profil',
    link: '/account',
  },
  {
    Icon: DirectionsRun,
    text: 'Zawodnicy',
    link: '/players',
  },
  {
    Icon: Security,
    text: 'Kluby',
    link: '/clubs',
  },
  {
    Icon: SportsSoccer,
    text: 'Mecze',
    link: '/matches',
  },
  {
    Icon: Assessment,
    text: 'Raporty',
    link: '/reports',
  },
];

export const extendedNavElements = [
  ...basicNavElements,
  {
    Icon: Assignment,
    text: 'Zlecenia',
    link: '/orders',
  },
];
