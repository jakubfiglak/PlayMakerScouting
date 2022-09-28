import { useHistory } from 'react-router-dom';
// MUI components
import { Badge } from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as ReportsIcon,
  Note as NotesIcon,
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
import { Player } from '../../types/players';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { getFlagEmoji } from '../../utils/countries';

type Props = {
  player: Player;
  isMenuActive?: boolean;
  onEditClick?: (player: Player) => void;
  onDeleteClick?: (id: string) => void;
  isEditOptionEnabled?: boolean;
  isDeleteOptionEnabled?: boolean;
};

export const PlayersTableRow = ({
  player,
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

  const {
    id,
    firstName,
    lastName,
    club,
    position,
    yearOfBirth,
    footed,
    reportsCount,
    notesCount,
    country,
  } = player;

  return (
    <StyledTableRow
      key={id}
      hover
      onClick={isMenuOpen ? undefined : () => history.push(`/players/${id}`)}
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
                handleMenuAction(() => onEditClick(player));
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
      <StyledTableCell>{`${firstName} ${lastName}`}</StyledTableCell>
      <StyledTableCell>{`${getFlagEmoji(country)} ${country}`}</StyledTableCell>
      <StyledTableCell>
        {club ? (
          <TableLink to={`/clubs/${club.id}`}>{club.name}</TableLink>
        ) : (
          '-'
        )}
      </StyledTableCell>
      <StyledTableCell>{getLabel(position)}</StyledTableCell>
      <StyledTableCell>{yearOfBirth}</StyledTableCell>
      <StyledTableCell>{getLabel(footed)}</StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={reportsCount || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={notesCount || '0'} color="secondary">
          <NotesIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  );
};
