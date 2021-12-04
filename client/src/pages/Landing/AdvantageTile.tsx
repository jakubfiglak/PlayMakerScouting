import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Advantage } from './types';

type Props = {
  advantage: Advantage;
};

export const AdvantageTile = ({ advantage }: Props) => {
  const classes = useStyles();

  const { title, icon, text } = advantage;

  return (
    <div className={classes.tile}>
      <div className={classes.heading}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        {icon}
      </div>
      <Typography className={classes.text}>{text}</Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  tile: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      margin: '0 auto',
      marginBottom: theme.spacing(2),
    },
  },
  heading: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    paddingRight: theme.spacing(2),
  },
}));
