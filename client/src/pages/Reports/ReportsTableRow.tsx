import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import {
  Box,
  Collapse,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Print as PrintIcon,
  Lock as CloseIcon,
  LockOpen as OpenIcon,
  Delete as DeleteIcon,
  Tv as TvIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
import { StatusChip } from './StatusChip';
import { SkillsChart } from '../Report/SkillsChart';
import { TableLink } from '../../components/table/TableLink';
import { TableMenu } from '../../components/table/TableMenu';
import { TableMenuItem } from '../../components/table/TableMenuItem';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
// Types
import { Report, ReportStatus } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils/dates';
import { getLabel } from '../../utils/getLabel';

type SetStatusArgs = { id: string; status: ReportStatus };

type Props = {
  report: Report;
  isMenuActive?: boolean;
  onEditClick?: (report: Report) => void;
  onDeleteClick?: (report: Report) => void;
  onSetStatusClick?: ({ id, status }: SetStatusArgs) => void;
  onPrintClick?: (report: Report) => void;
  isEditOptionEnabled?: boolean;
  isDeleteOptionEnabled?: boolean;
  isSetStatusOptionEnabled?: boolean;
  isAuthorNameClickable?: boolean;
};

export const ReportsTableRow = ({
  report,
  isMenuActive = false,
  onEditClick,
  onDeleteClick,
  onSetStatusClick,
  onPrintClick,
  isEditOptionEnabled = false,
  isDeleteOptionEnabled = false,
  isSetStatusOptionEnabled = false,
  isAuthorNameClickable = false,
}: Props) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu();

  const {
    id,
    status,
    author,
    player,
    createdAt,
    finalRating,
    videoURL,
    videoDescription,
    playerCurrentClub,
    shirtNo,
    summary,
    skills,
    maxRatingScore,
    positionPlayed,
  } = report;

  return (
    <>
      <StyledTableRow
        key={id}
        hover
        onClick={isMenuOpen ? undefined : () => history.push(`/reports/${id}`)}
        className={classes.root}
      >
        <StyledTableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        {isMenuActive &&
        onEditClick &&
        onDeleteClick &&
        onSetStatusClick &&
        onPrintClick ? (
          <StyledTableCell padding="checkbox">
            <TableMenu
              menuAnchorEl={menuAnchorEl}
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuClick}
              onMenuClose={handleMenuClose}
            >
              <TableMenuItem
                icon={<EditIcon fontSize="small" />}
                text="Edytuj"
                onClick={() => {
                  handleMenuAction(() => onEditClick(report));
                }}
                disabled={!isEditOptionEnabled}
              />
              <TableMenuItem
                icon={<PrintIcon fontSize="small" />}
                text="Drukuj"
                onClick={() => {
                  handleMenuAction(() => onPrintClick(report));
                }}
              />
              <TableMenuItem
                icon={
                  status === 'in-prep' ? (
                    <CloseIcon fontSize="small" />
                  ) : (
                    <OpenIcon fontSize="small" />
                  )
                }
                text={status === 'in-prep' ? 'Zamknij raport' : 'Otwórz raport'}
                onClick={() => {
                  handleMenuAction(() =>
                    onSetStatusClick({
                      id,
                      status: status === 'in-prep' ? 'closed' : 'in-prep',
                    }),
                  );
                }}
                disabled={!isSetStatusOptionEnabled}
              />
              <TableMenuItem
                icon={<DeleteIcon fontSize="small" />}
                text="Usuń"
                onClick={() => {
                  handleMenuAction(() => onDeleteClick(report));
                }}
                disabled={!isDeleteOptionEnabled}
              />
            </TableMenu>
          </StyledTableCell>
        ) : null}
        <StyledTableCell style={{ minWidth: 200 }}>
          <TableLink to={`/players/${player.id}`}>
            {`${player.firstName} ${player.lastName} (ur. ${player.yearOfBirth})`}
          </TableLink>
        </StyledTableCell>
        <StyledTableCell>{getLabel(positionPlayed)}</StyledTableCell>
        <StyledTableCell>
          <FinalRatingChip finalRating={finalRating} />
        </StyledTableCell>
        <StyledTableCell>
          {videoURL ? (
            <Tooltip title={videoDescription || 'video'}>
              <Link
                href={videoURL}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TvIcon />
              </Link>
            </Tooltip>
          ) : null}
        </StyledTableCell>
        <StyledTableCell>
          {isAuthorNameClickable ? (
            <TableLink to={`/users/${author.id}`}>
              {`${author.firstName} ${author.lastName}`}
            </TableLink>
          ) : (
            <>{`${author.firstName} ${author.lastName}`}</>
          )}
        </StyledTableCell>
        <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
        <StyledTableCell>
          <StatusChip status={status} />
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                {`Nr ${shirtNo || 'N/A'}, ${getLabel(player.position)} (${
                  playerCurrentClub.name
                }`}
              </Typography>
              <Typography gutterBottom variant="body2">
                {summary}
              </Typography>
              <Box width={200} height={200}>
                <SkillsChart
                  skills={skills}
                  maxRatingScore={maxRatingScore}
                  displayShortName
                />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
