import { FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

type Props = {
  to: string;
};

export const TableLink: FC<Props> = ({ to, children }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      onClick={(e: MouseEvent) => e.stopPropagation()}
    >
      {children}
    </Link>
  );
};
