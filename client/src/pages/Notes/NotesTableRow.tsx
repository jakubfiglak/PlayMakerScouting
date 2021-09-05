import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import {
  IconButton,
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
// Custom components
import { TableLink } from '../../components/table/TableLink';
import { TableMenu } from '../../components/table/TableMenu';
import { TableMenuItem } from '../../components/table/TableMenuItem';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Hooks
import { useTableMenu } from '../../hooks/useTableMenu';
// Types
import { Note } from '../../types/notes';
// Utils & data
import { formatDate } from '../../utils/dates';

type Props = {
  note: Note;
  isMenuActive?: boolean;
  onEditClick?: (note: Note) => void;
  onDeleteClick?: (id: string) => void;
  isEditOptionEnabled?: boolean;
  isDeleteOptionEnabled?: boolean;
  isAuthorNameClickable?: boolean;
};

export const NotesTableRow = ({
  note,
  isMenuActive = false,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled = false,
  isDeleteOptionEnabled = false,
  isAuthorNameClickable = false,
}: Props) => {
  const classes = useStyles();
  const history = useHistory();
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
    player,
    author,
    match,
    text,
    rating,
    maxRatingScore,
    percentageRating,
  } = note;

  return (
    <>
      <StyledTableRow
        hover
        onClick={isMenuOpen ? undefined : () => history.push(`/notes/${id}`)}
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
        {isMenuActive && onEditClick && onDeleteClick ? (
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
                  handleMenuAction(() => onEditClick(note));
                }}
                disabled={!isEditOptionEnabled}
              />
              <TableMenuItem
                icon={<DeleteIcon fontSize="small" />}
                text="Usuń"
                onClick={() => {
                  handleMenuAction(() => onDeleteClick(id));
                }}
                disabled={!isDeleteOptionEnabled}
              />
            </TableMenu>
          </StyledTableCell>
        ) : null}
        <StyledTableCell>
          {player ? (
            <TableLink to={`/players/${player.id}`}>
              {`${player.firstName} ${player.lastName}`}
            </TableLink>
          ) : (
            'N/A'
          )}
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
        <StyledTableCell>
          {match ? (
            <TableLink to={`/matches/${match.id}`}>
              {`${match.homeTeam.name} - ${match.awayTeam.name}`}
            </TableLink>
          ) : (
            'N/A'
          )}
        </StyledTableCell>
        <StyledTableCell>
          {match ? formatDate(match.date) : 'N/A'}
        </StyledTableCell>
        <StyledTableCell>{rating}</StyledTableCell>
        <StyledTableCell>{maxRatingScore}</StyledTableCell>
        <StyledTableCell>{`${percentageRating.toFixed(1)}%`}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                Treść notatki
              </Typography>
              <Typography gutterBottom variant="body2">
                {text}
              </Typography>
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
