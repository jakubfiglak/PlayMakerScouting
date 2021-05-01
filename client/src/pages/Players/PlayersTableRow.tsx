import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Search as SearchIcon } from '@material-ui/icons/';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Player } from '../../types/players';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  player: Player;
  handleSetCurrent: (player: Player) => void;
};

export const PlayersTableRow = ({ player, handleSetCurrent }: Props) => {
  const classes = useStyles();
  const {
    id,
    firstName,
    lastName,
    club,
    position,
    yearOfBirth,
    footed,
  } = player;

  return (
    <StyledTableRow>
      <StyledTableCell padding="checkbox">
        <div className={classes.buttonsContainer}>
          <Tooltip title="Zobacz profil">
            <Link component={RouterLink} to={`/players/${id}`}>
              <IconButton aria-label="go to players profile">
                <SearchIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit"
              onClick={() => handleSetCurrent(player)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{club.name}</StyledTableCell>
      <StyledTableCell>{getLabel(position)}</StyledTableCell>
      <StyledTableCell>{yearOfBirth}</StyledTableCell>
      <StyledTableCell>{getLabel(footed)}</StyledTableCell>
    </StyledTableRow>
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
