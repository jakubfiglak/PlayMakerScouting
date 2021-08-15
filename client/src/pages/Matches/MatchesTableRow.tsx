import { useHistory } from 'react-router-dom';
// MUI components
import { Link } from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Tv as TvIcon,
} from '@material-ui/icons';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { TableLink } from '../../components/table/TableLink';
import { TableMenu } from '../../components/table/TableMenu';
import { TableMenuItem } from '../../components/table/TableMenuItem';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
// Types
import { Match } from '../../types/matches';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = {
  match: Match;
  isMenuActive?: boolean;
  onEditClick?: (match: Match) => void;
  onDeleteClick?: (id: string) => void;
  isEditOptionEnabled?: boolean;
  isDeleteOptionEnabled?: boolean;
};

export const MatchesTableRow = ({
  match,
  isMenuActive = false,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled = false,
  isDeleteOptionEnabled = false,
}: Props) => {
  const history = useHistory();

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu();

  const { id, homeTeam, awayTeam, competition, date, result, videoURL } = match;

  return (
    <StyledTableRow
      key={id}
      hover
      onClick={isMenuOpen ? undefined : () => history.push(`/matches/${id}`)}
    >
      {isMenuActive && onEditClick && onDeleteClick ? (
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
                handleMenuAction(() => onEditClick(match));
              }}
              disabled={!isEditOptionEnabled}
            />
            <TableMenuItem
              icon={<DeleteIcon fontSize="small" />}
              text="Usuń"
              onClick={() => {
                handleMenuAction(() => onDeleteClick(id));
              }}
              disabled={!isDeleteOptionEnabled}
            />
          </TableMenu>
        </StyledTableCell>
      ) : null}
      <StyledTableCell>
        <TableLink to={`/clubs/${homeTeam.id}`}>{homeTeam.name}</TableLink>
      </StyledTableCell>
      <StyledTableCell>
        <TableLink to={`/clubs/${awayTeam.id}`}>{awayTeam.name}</TableLink>
      </StyledTableCell>
      <StyledTableCell>{getLabel(competition)}</StyledTableCell>
      <StyledTableCell>{formatDate(date)}</StyledTableCell>
      <StyledTableCell>{result}</StyledTableCell>
      <StyledTableCell align="center">
        {videoURL ? (
          <Link
            href={videoURL}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TvIcon />
          </Link>
        ) : null}
      </StyledTableCell>
    </StyledTableRow>
  );
};
