import React from 'react';
// MUI components
import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
// Types
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { getLabel } from '../../utils/getLabel';
import { useReportTemplates } from '../../operations/queries/useReportTemplates';

const headCells = [
  { id: 'name', label: 'Nazwa' },
  { id: 'maxRatingScore', label: 'Skala ocen' },
];

export const ReportTemplatesTable = () => {
  const { data } = useReportTemplates();

  return (
    <SimpleTable actions headCells={headCells}>
      {data
        ? data.map((template) => (
            <StyledTableRow key={template.id}>
              <StyledTableCell padding="checkbox">
                <Tooltip title="Edytuj">
                  <IconButton
                    aria-label="edit"
                    onClick={() => console.log(template.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>{template.name}</StyledTableCell>
              <StyledTableCell>{template.maxRatingScore}</StyledTableCell>
            </StyledTableRow>
          ))
        : null}
    </SimpleTable>
  );
};
