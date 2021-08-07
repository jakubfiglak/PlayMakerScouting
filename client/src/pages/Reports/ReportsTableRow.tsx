import { useHistory } from 'react-router-dom';
// MUI icons
import {
  Edit as EditIcon,
  Print as PrintIcon,
  Lock as CloseIcon,
  LockOpen as OpenIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
import { StatusChip } from './StatusChip';
import { TableLink } from '../../components/table/TableLink';
import { TableMenu } from '../../components/table/TableMenu';
import { TableMenuItem } from '../../components/table/TableMenuItem';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
// Types
import { Report, ReportStatus } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils/dates';

type SetStatusArgs = { id: string; status: ReportStatus };

type Props = {
  report: Report;
  isMenuActive?: boolean;
  onEditClick?: (report: Report) => void;
  onDeleteClick?: (report: Report) => void;
  onSetStatusClick?: ({ id, status }: SetStatusArgs) => void;
  onPrintClick?: (report: Report) => void;
  isEditOptionEnabled?: boolean;
  isDeleteOptionEnabled?: boolean;
  isSetStatusOptionEnabled?: boolean;
  isAuthorNameClickable?: boolean;
};

export const ReportsTableRow = ({
  report,
  isMenuActive = false,
  onEditClick,
  onDeleteClick,
  onSetStatusClick,
  onPrintClick,
  isEditOptionEnabled = false,
  isDeleteOptionEnabled = false,
  isSetStatusOptionEnabled = false,
  isAuthorNameClickable = false,
}: Props) => {
  const history = useHistory();

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu();

  const {
    id,
    status,
    author,
    player,
    createdAt,
    avgRating,
    percentageRating,
    maxRatingScore,
    finalRating,
  } = report;

  return (
    <StyledTableRow
      key={id}
      hover
      onClick={isMenuOpen ? undefined : () => history.push(`/reports/${id}`)}
    >
      {isMenuActive &&
      onEditClick &&
      onDeleteClick &&
      onSetStatusClick &&
      onPrintClick ? (
        <StyledTableCell padding="checkbox">
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
          >
            <TableMenuItem
              icon={<EditIcon fontSize="small" />}
              text="Edytuj"
              onClick={() => {
                handleMenuAction(() => onEditClick(report));
              }}
              disabled={!isEditOptionEnabled}
            />
            <TableMenuItem
              icon={<PrintIcon fontSize="small" />}
              text="Drukuj"
              onClick={() => {
                handleMenuAction(() => onPrintClick(report));
              }}
            />
            <TableMenuItem
              icon={
                status === 'in-prep' ? (
                  <CloseIcon fontSize="small" />
                ) : (
                  <OpenIcon fontSize="small" />
                )
              }
              text={status === 'in-prep' ? 'Zamknij raport' : 'Otwórz raport'}
              onClick={() => {
                handleMenuAction(() =>
                  onSetStatusClick({
                    id,
                    status: status === 'in-prep' ? 'closed' : 'in-prep',
                  }),
                );
              }}
              disabled={!isSetStatusOptionEnabled}
            />
            <TableMenuItem
              icon={<DeleteIcon fontSize="small" />}
              text="Usuń"
              onClick={() => {
                handleMenuAction(() => onDeleteClick(report));
              }}
              disabled={!isDeleteOptionEnabled}
            />
          </TableMenu>
        </StyledTableCell>
      ) : null}
      <StyledTableCell>
        <TableLink to={`/players/${player.id}`}>
          {`${player.firstName} ${player.lastName}`}
        </TableLink>
      </StyledTableCell>
      <StyledTableCell>
        {isAuthorNameClickable ? (
          <TableLink to={`/users/${author.id}`}>
            {`${author.firstName} ${author.lastName}`}
          </TableLink>
        ) : (
          <>{`${author.firstName} ${author.lastName}`}</>
        )}
      </StyledTableCell>
      <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
      <StyledTableCell>
        <StatusChip status={status} />
      </StyledTableCell>
      <StyledTableCell>{avgRating.toFixed(2)}</StyledTableCell>
      <StyledTableCell>{maxRatingScore}</StyledTableCell>
      <StyledTableCell>{`${percentageRating.toFixed(1)}%`}</StyledTableCell>
      <StyledTableCell>
        <FinalRatingChip finalRating={finalRating} />
      </StyledTableCell>
    </StyledTableRow>
  );
};
