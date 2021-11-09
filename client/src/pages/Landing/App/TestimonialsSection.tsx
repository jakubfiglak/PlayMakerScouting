import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { TestimonialCard } from './TestinonialCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { Testimonial } from './data';

type Props = { testimonials: Testimonial[] };

export const TestimonialsSection = ({ testimonials }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Zaufali nam
        </Typography>
        <Grid
          container
          spacing={3}
          justify="space-between"
          className={classes.container}
        >
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.name} xl={4} sm={12} xs={12}>
              <TestimonialCard
                title={testimonial.name}
                subtitle={testimonial.role}
                text={testimonial.text}
              />
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(3),
  },
  text: {
    fontSize: 18,
  },
}));
