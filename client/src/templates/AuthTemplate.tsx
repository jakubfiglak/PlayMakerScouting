import { FC } from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
import logoColor from '../assets/logo-color.png';

type Props = {
  title: string;
};

export const AuthTemplate: FC<Props> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          variant="square"
          src={logoColor}
          alt="PlaymakerPro Logo"
        />
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '92px',
    height: '84px',
  },
}));
