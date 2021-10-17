import { styled } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.secondary.light,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.secondary.main,
  },
}));
