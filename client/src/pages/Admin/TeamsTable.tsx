import React from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Delete as DeleteIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Loader } from '../../components/Loader';
// Hooks
import { useTeams } from '../../hooks/teams';
// Types
import { Team } from '../../types/teams';

type Props = {
  onDeleteClick: (team: Team) => void;
};

const headCells = [
  { id: 'name', label: 'Nazwa' },
  { id: 'members', label: 'Liczba członków' },
];

export const TeamsTable = ({ onDeleteClick }: Props) => {
  const history = useHistory();

  const { data, isLoading } = useTeams();

  return (
    <>
      {isLoading && <Loader />}
      <SimpleTable actions headCells={headCells}>
        {data
          ? data.map((team) => (
              <StyledTableRow
                key={team.id}
                hover
                onClick={() => history.push(`/teams/${team.id}`)}
              >
                <StyledTableCell padding="checkbox">
                  <Tooltip title="Usuń">
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(team);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>{team.name}</StyledTableCell>
                <StyledTableCell>{team.members.length}</StyledTableCell>
              </StyledTableRow>
            ))
          : null}
      </SimpleTable>
    </>
  );
};
