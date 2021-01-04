import React from 'react';
// MUI components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { IndividualSkillsStep } from './IndividualSkillsStep';
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
// Types
import { Position } from '../../../types/players';

type Props = {
  position: Position | null;
};

export const SkillsRatingStep = ({ position }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="individual-skills-content"
          id="individual-skills"
        >
          <Typography>Ocena umiejętności indywidualnych</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <IndividualSkillsStep position={position} />
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="teamplay-skills-content"
          id="teamplay-skills"
        >
          <Typography>Ocena współdziałania z partnerami</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamplaySkillsStep />
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="motor-skills-content"
          id="motor-skills"
        >
          <Typography>Ocena potencjału motorycznego</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MotorSkillsStep />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}));
