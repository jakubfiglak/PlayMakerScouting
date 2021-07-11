import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Tooltip, IconButton, Link, makeStyles } from '@material-ui/core';
// MUI icons
import { Delete as DeleteIcon, Search as SearchIcon } from '@material-ui/icons';
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
  const classes = useStyles();

  const { data, isLoading } = useTeams();

  return (
    <>
      {isLoading && <Loader />}
      <SimpleTable actions headCells={headCells}>
        {data
          ? data.map((team) => (
              <StyledTableRow key={team.id}>
                <StyledTableCell padding="checkbox">
                  <div className={classes.buttonsContainer}>
                    <Tooltip title="Zobacz szczegóły">
                      <Link component={RouterLink} to={`/teams/${team.id}`}>
                        <IconButton aria-label="go to order">
                          <SearchIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Usuń">
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteClick(team)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </div>
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

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
