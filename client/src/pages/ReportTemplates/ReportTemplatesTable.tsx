import React from 'react';
// MUI components
import { Tooltip, IconButton } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { ReportTemplate } from '../../types/reportTemplates';
// Hooks
import { useReportTemplates } from '../../operations/queries/useReportTemplates';

const headCells = [
  { id: 'name', label: 'Nazwa' },
  { id: 'maxRatingScore', label: 'Skala ocen' },
];

type Props = { onEditClick: (template: ReportTemplate) => void };

export const ReportTemplatesTable = ({ onEditClick }: Props) => {
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
                    onClick={() => onEditClick(template)}
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
