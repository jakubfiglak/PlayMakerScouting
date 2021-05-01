import React from 'react';
// MUI components
import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
// Types
import { useRatings } from '../../operations/queries/useRatings';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { getLabel } from '../../utils/getLabel';

const headCells = [
  { id: 'category', label: 'Kategoria' },
  { id: 'name', label: 'Nazwa' },
  { id: 'shortName', label: 'Nazwa skrócona' },
  { id: 'score', label: 'Opisowa' },
];

export const RatingsTable = () => {
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
                    onClick={() => console.log(rating.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>{getLabel(rating.category)}</StyledTableCell>
              <StyledTableCell>{rating.name}</StyledTableCell>
              <StyledTableCell>{rating.shortName}</StyledTableCell>
              <StyledTableCell>
                {rating.score ? null : <CheckIcon />}
              </StyledTableCell>
            </StyledTableRow>
          ))
        : null}
    </SimpleTable>
  );
};
