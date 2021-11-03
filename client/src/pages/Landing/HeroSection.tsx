import { ReactNode } from 'react';
import { makeStyles, Theme, Typography, List } from '@material-ui/core';
import { ListElement } from './ListElement';
import { CtaButton } from './CtaButton';
import { AppNumbers } from './AppNumbers';
import { LayoutContentWrapper } from './LayoutContentWrapper';

type Props = {
  backgroundImage: string;
  image: {
    src: string;
    alt: string;
  };
  title: ReactNode;
  features: string[];
  displayAppNumbers?: boolean;
};

export const HeroSection = ({
  backgroundImage,
  image,
  title,
  features,
  displayAppNumbers,
}: Props) => {
  const classes = useStyles({ backgroundImage });

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <div className={classes.innerContainer}>
          <div style={{ width: '40%' }} className={classes.imageContainer}>
            <img src={image.src} alt={image.alt} />
          </div>
          <div className={classes.contentContainer}>
            <Typography className={classes.heading} component="h2">
              {title}
            </Typography>
            <List className={classes.list}>
              {features.map((feature) => (
                <ListElement text={feature} key={feature} />
              ))}
            </List>
            <div className={classes.button}>
              <CtaButton text="Zobacz szczegóły" linkTo="#copy" />
            </div>
            {displayAppNumbers ? <AppNumbers /> : null}
          </div>
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

type StylesProps = {
  backgroundImage: string;
};

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  container: ({ backgroundImage }) => ({
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',

    [theme.breakpoints.down('lg')]: {
      backgroundPosition: 'left center',
    },
  }),
  innerContainer: {
    display: 'flex',
    color: theme.palette.primary.contrastText,
    paddingTop: 200,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 50,
    },
  },
  imageContainer: {
    width: '40%',

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },

    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
    },
  },
  list: {
    fontSize: 36,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    margin: '0 auto',
  },
  button: {
    alignSelf: 'flex-end',

    [theme.breakpoints.down('lg')]: {
      alignSelf: 'center',
    },
  },
}));
