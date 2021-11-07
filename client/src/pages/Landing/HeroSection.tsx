import { ReactNode } from 'react';
import { makeStyles, Theme, Typography, List } from '@material-ui/core';
import { ListElement } from './ListElement';
import { GoToSectionButton } from './GoToSectionButton';
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
          <div className={classes.imageContainer}>
            <img src={image.src} alt={image.alt} className={classes.image} />
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
              <GoToSectionButton text="Zobacz szczegóły" linkTo="#copy" />
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
    minHeight: '100vh',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
  },
  imageContainer: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',

    [theme.breakpoints.down('md')]: {
      order: 2,
      marginTop: theme.spacing(4),
    },
  },
  image: {
    width: '80%',
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
