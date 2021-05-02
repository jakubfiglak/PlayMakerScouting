import React from 'react';
// MUI components
import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Rating } from '../../types/ratings';
// Hooks
import { useRatings } from '../../operations/queries/useRatings';
// Utils & data
import { getLabel } from '../../utils/getLabel';

const headCells = [
  { id: 'category', label: 'Kategoria' },
  { id: 'name', label: 'Nazwa' },
  { id: 'shortName', label: 'Nazwa skrócona' },
  { id: 'score', label: 'Ocena punktowa' },
];

type Props = { onEditClick: (rating: Rating) => void };

export const RatingsTable = ({ onEditClick }: Props) => {
  const { data } = useRatings();

  return (
    <SimpleTable actions headCells={headCells}>
      {data
        ? data.map((rating) => (
            <StyledTableRow key={rating.id}>
              <StyledTableCell padding="checkbox">
                <Tooltip title="Edytuj">
                  <IconButton
                    aria-label="edit"
                    onClick={() => onEditClick(rating)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>{getLabel(rating.category)}</StyledTableCell>
              <StyledTableCell>{rating.name}</StyledTableCell>
              <StyledTableCell>{rating.shortName}</StyledTableCell>
              <StyledTableCell>
                {rating.score ? <CheckIcon /> : null}
              </StyledTableCell>
            </StyledTableRow>
          ))
        : null}
    </SimpleTable>
  );
};
