import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { NavButtonProps } from './types';
import { useStyles } from './styles';

export const NavButton = ({
  Icon,
  text,
  onClick,
  className,
}: NavButtonProps) => {
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <Icon color="error" />
        </ListItemIcon>
        <ListItemText primary={text} className={className} />
      </ListItem>
    </Button>
  );
};
