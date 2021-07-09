import React from 'react';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  makeStyles,
} from '@material-ui/core';

export const CreateReportCard = () => {
  const classes = useStyles();

  return (
    <Card>
      <Link
        to={{ pathname: '/reports', state: { setActiveTab: 1 } }}
        className={classes.link}
      >
        <CardActionArea className={classes.actionArea}>
          <CardContent className={classes.container}>
            <Typography variant="h6">STWÓRZ RAPORT</Typography>
            <div>
              <Avatar className={classes.avatar}>
                <AddIcon />
              </Avatar>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  actionArea: {
    height: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
}));
