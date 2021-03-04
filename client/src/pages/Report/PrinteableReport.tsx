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
import { ReportSkills } from './ReportSkills';
import { SkillsChart } from './SkillsChart';
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

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
    individualSkills,
    teamplaySkills,
    motorSkills,
    summary,
    finalRating,
    individualAvg,
    teamplayAvg,
    avgRating,
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
            {player.firstName} {player.lastName}, {getLabel(player.position)} (
            {player.club.name}, {player.club.division})
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
              {getLabel(match.competition)}
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
            individualSkills={individualSkills}
            teamplaySkills={teamplaySkills}
          />
        </div>
      </section>
      <Divider className={classes.divider} />
      <section>
        <Typography variant="h6" align="center" className={classes.heading}>
          Umiejętności indywidualne
        </Typography>
        <Typography align="center" className={classes.text} gutterBottom>
          Średnia ocen: {individualAvg.toFixed(2)}
        </Typography>
        <ReportSkills skills={individualSkills} printeable />
        <Divider className={classes.divider} />
        <Typography variant="h6" align="center" className={classes.heading}>
          Współdziałanie z partnerami
        </Typography>
        <Typography align="center" className={classes.text} gutterBottom>
          Średnia ocen: {teamplayAvg.toFixed(2)}
        </Typography>
        <ReportSkills skills={teamplaySkills} printeable />
      </section>
      <Divider className={classes.divider} />
      <section>
        <Typography
          variant="h6"
          align="center"
          className={classes.heading}
          gutterBottom
        >
          Cechy motoryczne
        </Typography>
        <Typography className={classes.text} gutterBottom>
          <strong>Cechy wiodące: </strong>
          {motorSkills.leading}
        </Typography>
        <Typography className={classes.text} gutterBottom>
          <strong>Cechy zaniedbane: </strong>
          {motorSkills.neglected}
        </Typography>
      </section>
      <Divider className={classes.divider} />
      <section>
        <Typography variant="h6" align="center" className={classes.heading}>
          Podsumowanie
        </Typography>
        <Typography align="center" className={classes.text} gutterBottom>
          Średnia ocen: {avgRating.toFixed(2)}
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
