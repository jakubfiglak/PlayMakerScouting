import React from 'react';
// MUI components
import { IconButton, Tooltip, Box } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// Custom components
import { StyledTableRow, StyledTableCell } from '../../common';
// Types
import { Club } from '../../../types/clubs';

type Props = {
  club: Club;
  isFavorite: boolean;
  handleSetCurrent: (club: Club) => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
};

export const ClubsTableRow = ({
  club,
  isFavorite,
  handleSetCurrent,
  addToFavorites,
  removeFromFavorites,
}: Props) => {
  const {
    _id,
    name,
    division,
    address: { voivodeship },
  } = club;

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Box display="flex">
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit"
              onClick={() => handleSetCurrent(club)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <IconButton
              aria-label="dodaj do ulubionych"
              onClick={
                isFavorite
                  ? () => removeFromFavorites(_id)
                  : () => addToFavorites(_id)
              }
            >
              {isFavorite ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" color="error" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
