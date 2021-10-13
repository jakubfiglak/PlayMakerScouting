import { useState, useEffect } from 'react';
import { List, Divider, makeStyles, Theme } from '@material-ui/core';
import {
  AccountCircle as ProfileIcon,
  Person as UserDataIcon,
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assignment as OrdersIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Create as ReportTemplatesIcon,
  PermContactCalendar as AdminIcon,
  Sports as MatchesIcon,
  Note as NotesIcon,
  Storage as DatabaseIcon,
  Visibility as ObservationIcon,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { NavElement } from './NavElement';
import { ExpandeableNavElement } from './ExpandeableNavElement';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { MatchButton } from './MatchButton';
import { QuickNoteButton } from './QuickNoteButton';
import { LogoutButton } from './LogoutButton';

const databaseListPaths = ['/players', '/clubs', '/matches'];
const observationListPaths = ['/reports', '/notes', '/reporttemplates'];
const profileListPaths = ['/account', '/settings'];

export const NavList = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const location = useLocation();

  const isPrivilegedUser =
    user.role === 'admin' || user.role === 'playmaker-scout';

  const isAdmin = user.role === 'admin';

  const [isDatabaseListOpen, setDatabaseListOpen] = useState(false);
  const [isObservationListOpen, setObservationListOpen] = useState(false);
  const [isProfileListOpen, setProfileListOpen] = useState(false);

  useEffect(() => {
    if (databaseListPaths.includes(location.pathname)) {
      setDatabaseListOpen(true);
    }
    if (observationListPaths.includes(location.pathname)) {
      setObservationListOpen(true);
    }
    if (profileListPaths.includes(location.pathname)) {
      setProfileListOpen(true);
    }
  }, [location.pathname]);

  return (
    <List component="nav" className={classes.list}>
      <NavElement
        icon={<HomeIcon color="error" />}
        to="/dashboard"
        text="Strona główna"
      />
      <ExpandeableNavElement
        icon={<DatabaseIcon color="error" />}
        handleClick={() => setDatabaseListOpen(!isDatabaseListOpen)}
        open={isDatabaseListOpen}
        title="Bazy"
      >
        <NavElement
          icon={<PlayersIcon color="error" />}
          to="/players"
          text="Zawodnicy"
        />
        <NavElement
          icon={<ClubsIcon color="error" />}
          to="/clubs"
          text="Kluby"
        />
        <NavElement
          icon={<MatchesIcon color="error" />}
          to="/matches"
          text="Mecze"
        />
      </ExpandeableNavElement>
      <ExpandeableNavElement
        icon={<ObservationIcon color="error" />}
        handleClick={() => setObservationListOpen(!isObservationListOpen)}
        open={isObservationListOpen}
        title="Obserwacje"
      >
        <NavElement
          icon={<ReportsIcon color="error" />}
          to="/reports"
          text="Raporty"
        />
        <NavElement
          icon={<NotesIcon color="error" />}
          to="/notes"
          text="Notatki"
        />
        <NavElement
          icon={<ReportTemplatesIcon color="error" />}
          to="/reporttemplates"
          text="Kreator szablonów"
        />
      </ExpandeableNavElement>
      {isPrivilegedUser ? (
        <NavElement
          icon={<OrdersIcon color="error" />}
          to="/orders"
          text="Zlecenia"
        />
      ) : null}
      <MatchButton onClick={() => console.log('hello')} isAtTheMatch={false} />
      <QuickNoteButton onClick={() => console.log('hello')} />
      {isAdmin ? (
        <NavElement
          icon={<AdminIcon color="error" />}
          to="/admin"
          text="Panel administratora"
        />
      ) : null}
      <Divider className={classes.divider} />
      <ExpandeableNavElement
        icon={<ProfileIcon color="error" />}
        handleClick={() => setProfileListOpen(!isProfileListOpen)}
        open={isProfileListOpen}
        title="Mój profil"
      >
        <NavElement
          icon={<UserDataIcon color="error" />}
          to="/account"
          text="Dane użytkownika"
        />
        <NavElement
          icon={<SettingsIcon color="error" />}
          to="/settings"
          text="Ustawienia"
        />
      </ExpandeableNavElement>
      <LogoutButton />
    </List>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    color: theme.palette.background.paper,
  },
  active: {
    background: theme.palette.primary.light,
  },
  divider: {
    background: theme.palette.secondary.main,
  },
}));
