import { FC, ReactNode } from 'react';
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

type Props = {
  handleClick: () => void;
  open: boolean;
  icon: ReactNode;
  title: string;
};

export const ExpandeableNavElement: FC<Props> = ({
  handleClick,
  open,
  icon,
  children,
  title,
}) => {
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'body2' }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ paddingLeft: '16px' }}>{children}</div>
      </Collapse>
    </>
  );
};
