import { ReactNode } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from './LayoutContentWrapper';

type Props = {
  title: ReactNode;
  text: string;
  image: {
    src: string;
    alt: string;
  };
};

export const CopySection = ({ title, text, image }: Props) => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper} id="copy">
      <LayoutContentWrapper>
        <div className={classes.container}>
          <div className={classes.contentContainer}>
            <Typography variant="h2" className={classes.heading}>
              {title}
            </Typography>
            <Typography className={classes.text}>{text}</Typography>
          </div>
          <div className={classes.imageContainer}>
            <img src={image.src} alt={image.alt} className={classes.image} />
          </div>
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: '#000',
    color: theme.palette.primary.contrastText,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '5%',
    padding: theme.spacing(4, 0),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing(3),
      gap: theme.spacing(4),
    },
  },
  contentContainer: {
    flexBasis: '80%',
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(2, 0),

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  text: {
    fontSize: 24,
  },
  imageContainer: {
    flexBasis: '15%',

    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
  image: {
    width: '100%',
  },
}));
