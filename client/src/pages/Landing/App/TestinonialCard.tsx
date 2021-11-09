import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  makeStyles,
  Theme,
} from '@material-ui/core';

type Props = {
  title: string;
  subtitle: string;
  text: string;
};

export const TestimonialCard = ({ title, subtitle, text }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subtitle}
        className={classes.header}
        subheaderTypographyProps={{ className: classes.subheader }}
      />
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
  },
  subheader: { color: theme.palette.secondary.contrastText },
}));
