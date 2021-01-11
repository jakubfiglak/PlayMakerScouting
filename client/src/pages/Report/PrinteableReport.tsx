import React from 'react';
// MUI components
import {
  Avatar,
  Grid,
  Typography,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportMatchStats } from './ReportMatchStats';
import { ReportSkills } from './ReportSkills';
import { ReportMotorSkills } from './ReportMotorSkills';
import { ReportSummary } from './ReportSummary';
// Assets
import logo from '../../assets/logo.png';
// Types
import { Report } from '../../types/reports';

type Props = {
  report: Report;
};

export const PrinteableReport = ({ report }: Props) => {
  const classes = useStyles();

  const {
    _id,
    player,
    match,
    order,
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
      <div className={classes.logoContainer}>
        <Avatar
          alt="Playmaker logo"
          src={logo}
          variant="square"
          className={classes.avatar}
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Raport z obserwacji nr {_id}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ReportBasicInfo
            player={player}
            match={match}
            scout={scout}
            order={order}
            createdAt={createdAt}
          />
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <ReportMatchStats
            minutesPlayed={minutesPlayed}
            assists={assists}
            goals={goals}
            yellowCards={yellowCards}
            redCards={redCards}
          />
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography variant="h6" align="center" className={classes.heading}>
            Umiejętności indywidualne
          </Typography>
          <ReportSkills skills={individualSkills} />
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography variant="h6" align="center" className={classes.heading}>
            Współdziałanie z partnerami
          </Typography>
          <ReportSkills skills={teamplaySkills} />
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography variant="h6" align="center" className={classes.heading}>
            Cechy motoryczne
          </Typography>
          <ReportMotorSkills skills={motorSkills} />
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography variant="h6" align="center" className={classes.heading}>
            Podsumowanie
          </Typography>
          <ReportSummary
            summary={summary}
            finalRating={finalRating}
            individualAvg={individualAvg}
            teamplayAvg={teamplayAvg}
            avgRating={avgRating}
            individualSkills={individualSkills}
            teamplaySkills={teamplaySkills}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2, 8),
    background: theme.palette.background.paper,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    paddingBottom: theme.spacing(2),
  },
  divider: {
    width: '100%',
  },
  heading: {
    padding: theme.spacing(2),
  },
}));
