import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Search as SearchIcon } from '@material-ui/icons';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Club } from '../../types/clubs';

type Props = {
  club: Club;
  handleSetCurrent: (club: Club) => void;
};

export const ClubsTableRow = ({ club, handleSetCurrent }: Props) => {
  const classes = useStyles();

  const { id, name, division, voivodeship } = club;

  return (
    <StyledTableRow>
      <StyledTableCell padding="checkbox">
        <div className={classes.buttonsContainer}>
          <Tooltip title="Zobacz profil">
            <Link component={RouterLink} to={`/clubs/${id}`}>
              <IconButton aria-label="go to clubs profile">
                <SearchIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit"
              onClick={() => handleSetCurrent(club)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
