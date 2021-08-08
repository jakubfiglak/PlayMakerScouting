import { FC } from 'react';
// MUI components
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Theme,
} from '@material-ui/core';

type Props = { title: string };

export const ReportCard: FC<Props> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}));
