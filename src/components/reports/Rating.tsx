import React from 'react';
// MUI components
import { Grid, Typography } from '@material-ui/core';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

type RatingProps = {
  label: string;
  rating: 1 | 2 | 3 | 4;
  note: string;
};

export const Rating = ({ label, rating, note }: RatingProps) => {
  const basicArr = [1, 2, 3, 4];
  const ratingArr = Array.from(Array(rating), (el, idx) => idx + 1);
  const emptyArr = basicArr.filter((el) => !ratingArr.includes(el));

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3} md={2}>
          <Typography>
            <strong>{label}</strong>
          </Typography>
        </Grid>
        <Grid item xs={3} md={2}>
          {ratingArr.map((el) => (
            <SportsSoccerIcon color="secondary" key={el} />
          ))}
          {emptyArr.map((el) => (
            <SportsSoccerIcon color="disabled" key={el} />
          ))}
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary">
        {note}
      </Typography>
    </Grid>
  );
};
