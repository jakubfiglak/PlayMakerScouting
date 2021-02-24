import React from 'react';
// MUI components
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Assets
import logo from '../../assets/logo.png';
// Utils & data
import { MainTemplate } from '../../templates/MainTemplate';

export const DashboardPage = () => {
  const classes = useStyles();

  return (
    <MainTemplate>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <Avatar
            alt="Playmaker logo"
            src={logo}
            variant="square"
            className={classes.avatar}
          />
        </div>
        <Typography variant="h6" align="center" className={classes.heading}>
          Witaj w aplikacji scoutingowej Playmaker Pro
        </Typography>
        <Typography>Produkt umożliwia: </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BallIcon />
            </ListItemIcon>
            <ListItemText primary="Tworzenie bazy klubów oraz zawodników wartych obserwowania" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BallIcon />
            </ListItemIcon>
            <ListItemText primary="Tworzenie raportów z obserwacji meczowej zawodnika" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BallIcon />
            </ListItemIcon>
            <ListItemText primary="Przyjmowanie i realizację zleceń wystawianych przez zespół Playmaker Pro" />
          </ListItem>
        </List>
        <Typography>
          Chcesz zostać scoutem Playmaker Pro? Napisz do nas!
        </Typography>
      </div>
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    paddingBottom: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));
