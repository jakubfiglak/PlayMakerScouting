import { Typography, makeStyles, Theme } from '@material-ui/core';

type Props = {
  title: string;
};

export const PageHeading = ({ title }: Props) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h6"
      component="h2"
      align="center"
      className={classes.header}
    >
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
}));
