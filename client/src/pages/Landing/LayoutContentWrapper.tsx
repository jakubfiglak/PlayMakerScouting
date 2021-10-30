import { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

type Props = {
  children: ReactNode;
};

export const LayoutContentWrapper = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.wrapper}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    maxWidth: 1600,
    margin: '0 auto',
    padding: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 1),
    },
  },
}));
