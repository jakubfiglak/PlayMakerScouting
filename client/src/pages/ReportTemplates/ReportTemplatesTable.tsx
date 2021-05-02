import React from 'react';
// MUI components
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
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

type Props = {
  onEditClick: (template: ReportTemplate) => void;
  onDeleteClick: (template: ReportTemplate) => void;
};

export const ReportTemplatesTable = ({ onEditClick, onDeleteClick }: Props) => {
  const classes = useStyles();
  const { data } = useReportTemplates();

  return (
    <SimpleTable actions headCells={headCells}>
      {data
        ? data.map((template) => (
            <StyledTableRow key={template.id}>
              <StyledTableCell padding="checkbox">
                <div className={classes.buttonsContainer}>
                  <Tooltip title="Edytuj">
                    <IconButton
                      aria-label="edit"
                      onClick={() => onEditClick(template)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Usuń">
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDeleteClick(template)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </div>
              </StyledTableCell>
              <StyledTableCell>{template.name}</StyledTableCell>
              <StyledTableCell>{template.maxRatingScore}</StyledTableCell>
            </StyledTableRow>
          ))
        : null}
    </SimpleTable>
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
