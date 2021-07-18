import { useState, MouseEvent } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// MUI components
import { Tooltip, Link } from '@material-ui/core';
// MUI icons
import {
  AssignmentLate as NoteIcon,
  Lock as CloseIcon,
  CancelOutlined as RejectIcon,
  AssignmentTurnedIn as AcceptIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
// Custom components
import { OrderStatusChip } from './OrderStatusChip';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { TableMenuItem } from '../../components/table/TableMenuItem';
import { TableMenu } from '../../components/table/TableMenu';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Order } from '../../types/orders';
// Utils & data
import { formatDate } from '../../utils/dates';
import { getLabel } from '../../utils/getLabel';

type Props = {
  order: Order;
  onAcceptOrderClick: (id: string) => void;
  onCloseOrderClick: (id: string) => void;
  onRejectOrderClick: (id: string) => void;
  onDeleteOrderClick: (id: string) => void;
  areAdminOptionsEnabled: boolean;
};

export const OrdersTableRow = ({
  order,
  onAcceptOrderClick,
  onCloseOrderClick,
  onDeleteOrderClick,
  onRejectOrderClick,
  areAdminOptionsEnabled,
}: Props) => {
  const history = useHistory();
  const user = useAuthenticatedUser();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  function handleMenuClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorEl(null);
  }

  function handleMenuAction(id: string, action: (id: string) => void) {
    action(id);
    handleMenuClose();
  }

  const { id, scout, player, status, notes, createdAt } = order;

  return (
    <StyledTableRow
      hover
      onClick={isMenuOpen ? undefined : () => history.push(`/orders/${id}`)}
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
        >
          {status === 'open' ? (
            <TableMenuItem
              icon={<AcceptIcon fontSize="small" />}
              text="Przyjmij"
              onClick={() => {
                handleMenuAction(id, onAcceptOrderClick);
              }}
            />
          ) : (
            <TableMenuItem
              icon={<RejectIcon fontSize="small" />}
              text="Odrzuć"
              disabled={scout?.id !== user.id}
              onClick={() => {
                handleMenuAction(id, onRejectOrderClick);
              }}
            />
          )}
          {areAdminOptionsEnabled
            ? [
                <TableMenuItem
                  icon={<CloseIcon fontSize="small" />}
                  text="Zamknij"
                  onClick={() => {
                    handleMenuAction(id, onCloseOrderClick);
                  }}
                  disabled={status !== 'accepted'}
                  key="close"
                />,
                <TableMenuItem
                  icon={<DeleteIcon fontSize="small" />}
                  text="Usuń"
                  onClick={() => {
                    handleMenuAction(id, onDeleteOrderClick);
                  }}
                  key="delete"
                />,
              ]
            : null}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>
        <Link
          component={RouterLink}
          to={`/players/${player.id}`}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {`${player.firstName} ${player.lastName}`}
        </Link>
      </StyledTableCell>
      <StyledTableCell>{getLabel(player.position)}</StyledTableCell>
      <StyledTableCell>
        <Link
          component={RouterLink}
          to={`/clubs/${player.club.id}`}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {player.club.name}
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <OrderStatusChip status={status} />
      </StyledTableCell>
      <StyledTableCell>
        {scout ? `${scout.firstName} ${scout.lastName}` : ''}
      </StyledTableCell>
      <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
      <StyledTableCell padding="checkbox" align="center">
        {notes && (
          <Tooltip title={notes}>
            <NoteIcon />
          </Tooltip>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};
