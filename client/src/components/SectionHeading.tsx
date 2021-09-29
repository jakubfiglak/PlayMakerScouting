import { Typography, makeStyles, Theme } from '@material-ui/core';

type Props = { title: string };

export const SectionHeading = ({ title }: Props) => {
  const classes = useStyles();

  return (
    <Typography variant="h3" align="center" className={classes.title}>
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(4, 0, 3),
  },
}));
