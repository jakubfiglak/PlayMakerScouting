import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Loader } from '../../components/Loader';
// Types
import { Rating } from '../../types/ratings';
// Hooks
import { useRatings } from '../../hooks/ratings';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Utils & data
import { getLabel } from '../../utils/getLabel';

const headCells = [
  { id: 'category', label: 'Kategoria' },
  { id: 'name', label: 'Nazwa' },
  { id: 'shortName', label: 'Nazwa skrócona' },
  { id: 'score', label: 'Ocena punktowa' },
];

type Props = {
  onEditClick: (rating: Rating) => void;
  onDeleteClick: (rating: Rating) => void;
};

export const RatingsTable = ({ onEditClick, onDeleteClick }: Props) => {
  const classes = useStyles();
  const { data, isLoading } = useRatings();
  const user = useAuthenticatedUser();

  return (
    <>
      {isLoading && <Loader />}
      <SimpleTable actions headCells={headCells}>
        {data
          ? data.map((rating) => (
              <StyledTableRow key={rating.id}>
                <StyledTableCell padding="checkbox">
                  <div className={classes.buttonsContainer}>
                    <Tooltip title="Edytuj">
                      <IconButton
                        aria-label="edit"
                        onClick={() => onEditClick(rating)}
                        disabled={
                          user.role !== 'admin' && rating.author !== user.id
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń">
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteClick(rating)}
                        disabled={
                          user.role !== 'admin' && rating.author !== user.id
                        }
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </div>
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
    </>
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
