import React from 'react';
// MUI components
import { IconButton, Tooltip, Box } from '@material-ui/core';
// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell, Loader, Modal } from '../../common';
// Types
import { Match } from '../../../types/matches';
// Hooks
import { useAuthState } from '../../../context';
import { useModal } from '../../../hooks';
// Utils & data
import { formatDate, getLabel } from '../../../utils';
import { competitionLabels } from '../../../data';
// Styles
import { useStyles } from '../styles';

type TableRowProps = {
  match: Match;
  deleteMatch: (id: string) => void;
  handleSetCurrent: (match: Match) => void;
};

export const MatchesTableRow = ({
  match,
  deleteMatch,
  handleSetCurrent,
}: TableRowProps) => {
  const classes = useStyles();
  const [isModalOpen, handleClickOpen, handleClose] = useModal();

  const authContext = useAuthState();
  const { _id, homeTeam, awayTeam, date, competition } = match;

  const { loading, user } = authContext;

  return (
    <StyledTableRow>
      {loading && <Loader />}
      <StyledTableCell>
        <Box display="flex">
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit"
              onClick={() => handleSetCurrent(match)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Usuń">
            <div>
              <IconButton
                aria-label="delete"
                className={classes.delete}
                disabled={user?.role !== 'admin'}
                onClick={handleClickOpen}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Modal
                open={isModalOpen}
                message={`Usunąć mecz ${homeTeam.name} vs. ${awayTeam.name} z bazy?`}
                handleAccept={() => deleteMatch(_id)}
                handleClose={handleClose}
              />
            </div>
          </Tooltip>
        </Box>
      </StyledTableCell>
      <StyledTableCell>{formatDate(date)}</StyledTableCell>
      <StyledTableCell>{homeTeam.name}</StyledTableCell>
      <StyledTableCell>{awayTeam.name}</StyledTableCell>
      <StyledTableCell>
        {getLabel(competition, competitionLabels)}
      </StyledTableCell>
    </StyledTableRow>
  );
};
