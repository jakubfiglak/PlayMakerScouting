import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Delete as DeleteIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { User } from '../../types/auth';

type Props = {
  users: User[];
  onDeleteClick: (member: User) => void;
};

const headCells = [
  { id: 'lastName', label: 'Nazwisko' },
  { id: 'firstName', label: 'Imię' },
  { id: 'city', label: 'Miasto' },
  { id: 'voivodeship', label: 'Województwo' },
];

export const MembersTable = ({ users, onDeleteClick }: Props) => {
  return (
    <SimpleTable actions headCells={headCells}>
      {users.map((user) => (
        <StyledTableRow key={user.id}>
          <StyledTableCell padding="checkbox">
            <Tooltip title="Usuń członka">
              <IconButton
                aria-label="delete"
                onClick={() => onDeleteClick(user)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
          <StyledTableCell>{user.lastName}</StyledTableCell>
          <StyledTableCell>{user.firstName}</StyledTableCell>
          <StyledTableCell>{user.city ? user.city : '-'}</StyledTableCell>
          <StyledTableCell>
            {user.voivodeship ? user.voivodeship : '-'}
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </SimpleTable>
  );
};
