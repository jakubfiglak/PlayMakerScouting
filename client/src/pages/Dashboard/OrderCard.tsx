import React from 'react';
import { Link } from 'react-router-dom';
// MUI components
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Assignment as OrderIcon } from '@material-ui/icons';
// Types
import { Order } from '../../types/orders';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = {
  order: Order;
  title: string;
};

export const OrderCard = ({ order, title }: Props) => {
  const classes = useStyles();

  const { player, docNumber, id: _id, createdAt } = order;

  return (
    <Card className={classes.container}>
      <CardActionArea>
        <Link to={`/orders/${_id}`} className={classes.link}>
          <CardHeader
            avatar={
              <Avatar aria-label="order icon" className={classes.avatar}>
                <OrderIcon />
              </Avatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={`Zlecenie nr ${docNumber}`}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik: </strong>
              {player.firstName} {player.lastName}, {getLabel(player.position)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {formatDate(createdAt, true)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '0 auto',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  avatar: {
    background: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
}));
