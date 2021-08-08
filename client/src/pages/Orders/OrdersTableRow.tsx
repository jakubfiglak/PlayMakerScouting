import { useHistory, Link as RouterLink } from 'react-router-dom';
// MUI components
import { Tooltip, Badge, makeStyles } from '@material-ui/core';
// MUI icons
import {
  AssignmentLate as NoteIcon,
  Lock as CloseIcon,
  CancelOutlined as RejectIcon,
  AssignmentTurnedIn as AcceptIcon,
  Delete as DeleteIcon,
  NoteAdd as CreateReportIcon,
  Assessment as ReportsIcon,
} from '@material-ui/icons';
// Custom components
import { OrderStatusChip } from './OrderStatusChip';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { TableMenuItem } from '../../components/table/TableMenuItem';
import { TableMenu } from '../../components/table/TableMenu';
import { TableLink } from '../../components/table/TableLink';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
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
  canRejectOrder: boolean;
  canCreateReport: boolean;
};

export const OrdersTableRow = ({
  order,
  onAcceptOrderClick,
  onCloseOrderClick,
  onDeleteOrderClick,
  onRejectOrderClick,
  areAdminOptionsEnabled,
  canRejectOrder,
  canCreateReport,
}: Props) => {
  const history = useHistory();
  const classes = useStyles();

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu();

  const { id, scout, player, status, notes, createdAt, reportsCount } = order;

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
                handleMenuAction(() => onAcceptOrderClick(id));
              }}
            />
          ) : (
            <TableMenuItem
              icon={<RejectIcon fontSize="small" />}
              text="Odrzuć"
              disabled={!canRejectOrder}
              onClick={() => {
                handleMenuAction(() => onRejectOrderClick(id));
              }}
            />
          )}
          {areAdminOptionsEnabled
            ? [
                <TableMenuItem
                  icon={<CloseIcon fontSize="small" />}
                  text="Zamknij"
                  onClick={() => {
                    handleMenuAction(() => onCloseOrderClick(id));
                  }}
                  disabled={status !== 'accepted'}
                  key="close"
                />,
                <TableMenuItem
                  icon={<DeleteIcon fontSize="small" />}
                  text="Usuń"
                  onClick={() => {
                    handleMenuAction(() => onDeleteOrderClick(id));
                  }}
                  key="delete"
                />,
              ]
            : null}
          {canCreateReport ? (
            <RouterLink
              to={{
                pathname: '/reports',
                state: { activeTab: 1, orderId: id },
              }}
              className={classes.link}
            >
              <TableMenuItem
                icon={<CreateReportIcon fontSize="small" />}
                text="Twórz raport"
              />
            </RouterLink>
          ) : null}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>
        <TableLink to={`/players/${player.id}`}>
          {`${player.firstName} ${player.lastName}`}
        </TableLink>
      </StyledTableCell>
      <StyledTableCell>{getLabel(player.position)}</StyledTableCell>
      <StyledTableCell>
        <TableLink to={`/clubs/${player.club.id}`}>
          {player.club.name}
        </TableLink>
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
      <StyledTableCell align="center">
        <Badge badgeContent={reportsCount || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));
