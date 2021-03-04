import { ReactElement } from 'react';
import { UserRole } from '../../types/auth';

export type NavItem = {
  icon: ReactElement;
  text: string;
  to: string;
  allowedRoles: UserRole[];
};
