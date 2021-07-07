import React from 'react';
import clsx from 'clsx';
// MUI components
import {
  Typography,
  Divider,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { SkillsPrintSection } from './SkillsPrintSection';
import { SkillsChart } from './SkillsChart';
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';
import { SkillsCategories } from '../../types/ratings';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';
import { groupSkillsByCategory } from '../../utils/groupSkillsByCategory';

type Props = {
  report: Report;
};

export const PrinteableReport = ({ report }: Props) => {
  const classes = useStyles();

  const {
    docNumber,
    player,
    match,
    scout,
    createdAt,
    minutesPlayed,
    assists,
    goals,
    yellowCards,
    redCards,
    summary,
    finalRating,
    avgRating,
    skills,
    maxRatingScore,
    playerCurrentClub,
    positionPlayed,
    shirtNo,
    percentageRating,
  } = report;

  return (
    <div className={classes.container}>
      <header>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Raport z obserwacji nr {docNumber}
        </Typography>
      </header>
      <section className={classes.flex}>
        <div>
          <Typography className={classes.text} gutterBottom>
            <strong>Zawodnik: </strong>
            {player.firstName} {player.lastName}, {`ur. ${player.yearOfBirth}`}
          </Typography>
          <Typography className={classes.text} gutterBottom>
            <strong>Klub: </strong>
            {`${playerCurrentClub.name} (${playerCurrentClub.division})`}
          </Typography>
          <Typography className={classes.text} gutterBottom>
            <strong>Pozycja nominalna/pozycja w meczu: </strong>
            {`${getLabel(player.position)} / ${getLabel(positionPlayed)}`}
          </Typography>
          <Typography className={classes.text} gutterBottom>
            <strong>Nr na koszulce w meczu: </strong>
            {shirtNo || 'N/A'}
          </Typography>
          <div className={classes.flex}>
            <Typography className={classes.text} gutterBottom>
              <strong>Noga: </strong>
              {getLabel(player.footed)}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Wzrost / Waga: </strong>
              {player.height} cm / {player.weight} kg
            </Typography>
          </div>
          <div className={classes.flex}>
            <Typography className={classes.text} gutterBottom>
              <strong>Mecz: </strong>
              vs. {match.against} ({getLabel(match.location)}),{' '}
              {getLabel(match.competition)}, {match.result}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Data meczu: </strong>
              {formatDate(match.date, true)}
            </Typography>
          </div>
          <div className={classes.flex}>
            <Typography className={classes.text} gutterBottom>
              <strong>Scout: </strong>
              {scout.firstName} {scout.lastName}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Data utworzenia: </strong>
              {formatDate(createdAt, true)}
            </Typography>
          </div>
          <div className={classes.flex}>
            <Typography className={classes.text} gutterBottom>
              <strong>Minuty rozegrane: </strong>
              {minutesPlayed}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Bramki: </strong>
              {goals}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Asysty: </strong>
              {assists}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Żółte kartki: </strong>
              {yellowCards}
            </Typography>
            <Typography
              className={clsx(classes.text, classes.marginLeft)}
              gutterBottom
            >
              <strong>Czerwone kartki: </strong>
              {redCards}
            </Typography>
          </div>
          <Typography className={classes.text} gutterBottom>
            <strong>Profil 90minut.pl: </strong>
            <Link href={player.minut90ProfileURL}>
              {player.minut90ProfileURL}
            </Link>
          </Typography>
          <Typography className={classes.text} gutterBottom>
            <strong>Profil Transfermarkt: </strong>
            <Link href={player.transfermarktProfileURL}>
              {player.transfermarktProfileURL}
            </Link>
          </Typography>
        </div>
        <div>
          <SkillsChart
            skills={skills.filter((skill) => skill.score)}
            maxRatingScore={report.maxRatingScore}
          />
        </div>
      </section>
      <Divider className={classes.divider} />
      {Object.entries(groupSkillsByCategory(skills)).map(([key, value]) => (
        <>
          <SkillsPrintSection
            category={key as SkillsCategories}
            key={key}
            maxRatingScore={maxRatingScore}
            skills={value || []}
          />
          <Divider className={classes.divider} />
        </>
      ))}
      <section>
        <Typography variant="h6" align="center" className={classes.heading}>
          Podsumowanie
        </Typography>
        <Typography align="center" className={classes.text} gutterBottom>
          Średnia ocen: {avgRating.toFixed(2)} (${percentageRating.toFixed(1)}%)
        </Typography>
        <Typography className={classes.text} gutterBottom>
          {summary}
        </Typography>
        <div className={classes.flex}>
          <Typography className={classes.text}>
            <strong>Ocena ostateczna: </strong>
          </Typography>
          <div className={classes.marginLeft}>
            <FinalRatingChip finalRating={finalRating} printeable />
          </div>
        </div>
      </section>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2, 4),
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
  },
  text: {
    fontSize: 10,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  divider: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
}));
