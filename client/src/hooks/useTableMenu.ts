import { useState, MouseEvent } from 'react';

export function useTableMenu() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  function handleMenuClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorEl(null);
  }

  function handleMenuAction(action: () => void) {
    action();
    handleMenuClose();
  }

  return {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  };
}
