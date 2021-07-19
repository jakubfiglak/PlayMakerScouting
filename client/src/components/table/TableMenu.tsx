import { MouseEvent, FC } from 'react';
import { IconButton, Menu, MenuList, Tooltip } from '@material-ui/core';
import { MoreVert as MenuIcon } from '@material-ui/icons';

type Props = {
  menuAnchorEl: Element | null;
  isMenuOpen: boolean;
  onMenuClick: (e: MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
};

export const TableMenu: FC<Props> = ({
  children,
  menuAnchorEl,
  isMenuOpen,
  onMenuClick,
  onMenuClose,
}) => {
  return (
    <div>
      <Tooltip title="Menu">
        <IconButton
          aria-label="open-menu"
          aria-controls="row-menu"
          aria-haspopup="true"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="row-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={onMenuClose}
      >
        <MenuList>{children}</MenuList>
      </Menu>
    </div>
  );
};
