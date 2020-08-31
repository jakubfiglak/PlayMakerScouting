import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { NavButtonProps } from './types';
import useStyles from './styles';

const NavButton: React.FC<NavButtonProps> = ({
  Icon,
  text,
  onClick,
  className,
}) => {
  const classes = useStyles();

  return (
    <Button className={classes.link} onClick={onClick}>
      <ListItem button>
        <ListItemIcon>
          <Icon color="error" />
        </ListItemIcon>
        <ListItemText primary={text} className={className} />
      </ListItem>
    </Button>
  );
};

export default NavButton;
