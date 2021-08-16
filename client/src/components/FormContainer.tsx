import { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

type Props = { fullWidth?: boolean };

export const FormContainer: FC<Props> = ({ children, fullWidth = false }) => {
  const classes = useStyles({ fullWidth });

  return <div className={classes.container}>{children}</div>;
};

const useStyles = makeStyles<Theme, Props>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 'auto', 2),

    '& > * + *': {
      marginTop: theme.spacing(2),
    },

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    width: (props) => (props.fullWidth ? '100%' : undefined),
  },
}));
