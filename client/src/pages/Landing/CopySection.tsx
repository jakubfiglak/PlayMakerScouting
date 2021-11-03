import { ReactNode } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from './LayoutContentWrapper';

type Props = {
  title: ReactNode;
  text: string;
};

export const CopySection = ({ title, text }: Props) => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper} id="copy">
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          {title}
        </Typography>
        <Typography className={classes.text}>{text}</Typography>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: '#000',
    color: theme.palette.primary.contrastText,
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(3, 0),
    textAlign: 'center',

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  text: {
    fontSize: 24,
    padding: theme.spacing(1),
  },
}));
