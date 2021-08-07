import { useHistory } from 'react-router-dom';
// MUI icons
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { TableMenu } from '../../components/table/TableMenu';
import { TableMenuItem } from '../../components/table/TableMenuItem';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
// Types
import { Club } from '../../types/clubs';

type Props = {
  club: Club;
  onEditClick: (club: Club) => void;
  onDeleteClick: (id: string) => void;
  isEditOptionEnabled: boolean;
  isDeleteOptionEnabled: boolean;
};

export const ClubsTableRow = ({
  club,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
}: Props) => {
  const history = useHistory();

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu();

  const { id, name, division, voivodeship } = club;

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => history.push(`/clubs/${id}`)}
    >
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
              handleMenuAction(() => onEditClick(club));
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
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
