import React, { useEffect } from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
import { Loader } from '../../common';
// Hooks
import { usePlayersState } from '../../../context';
// Utils & data
import { commonIndSkillsFields } from '../../../data';
import { getIndSkillsFields } from '../../../utils';

type Props = {
  player: string;
};

export const IndividualSkillsStep = ({ player }: Props) => {
  const playersContext = usePlayersState();
  const { loading, playerData, getPlayer } = playersContext;

  useEffect(() => {
    getPlayer(player);
  }, []);

  let specificIndSkillsFields: { title: string; namespace: string }[] = [];

  if (playerData?.position) {
    specificIndSkillsFields = getIndSkillsFields(playerData.position);
  }

  const skillsFields = [...commonIndSkillsFields, ...specificIndSkillsFields];

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={3}>
        {skillsFields.map(({ title, namespace }) => (
          <Grid item xs={12} key={title}>
            <RatingInput
              title={title}
              namespace={`individualSkills.${namespace}`}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
