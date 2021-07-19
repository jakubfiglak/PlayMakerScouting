import { ReactElement } from 'react';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';

type Props = {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const TableMenuItem = ({ icon, text, onClick, disabled }: Props) => {
  return (
    <MenuItem onClick={onClick} disabled={disabled}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant="body2" color="textSecondary">
        {text}
      </Typography>
    </MenuItem>
  );
};
