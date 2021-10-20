import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { CheckBox as Icon } from '@material-ui/icons';

type Props = {
  text: string;
};

export const ListElement = ({ text }: Props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon>
        <Icon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={text} classes={{ primary: classes.text }} />
    </ListItem>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 36,
    color: theme.palette.primary.contrastText,
  },
  text: {
    fontSize: 24,
  },
}));
