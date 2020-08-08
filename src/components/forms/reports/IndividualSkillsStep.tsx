import React, { useEffect } from 'react';
// MUI components
import { Grid, TextFieldProps } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
import { Loader } from '../../common';
// Hooks
import { usePlayersState } from '../../../context';
// Types
import { IndSkillsFormData, RatingScore } from '../../../types/reports';
import { SkillsField } from '../../../data/individualSkillsFields';
// Utils & data
import { commonIndSkillsFields } from '../../../data';
import { getIndSkillsFields } from '../../../utils';

type IndividualSkillsStepProps = { player: string } & IndSkillsFormData &
  TextFieldProps;

export const IndividualSkillsStep = (props: IndividualSkillsStepProps) => {
  const { onChange, player } = props;

  const playersContext = usePlayersState();
  const { loading, playerData, getPlayer } = playersContext;

  useEffect(() => {
    getPlayer(player);
  }, []);

  let specificIndSkillsFields: SkillsField[] = [];

  if (playerData?.position) {
    specificIndSkillsFields = getIndSkillsFields(playerData.position);
  }

  const skillsFields = [...commonIndSkillsFields, ...specificIndSkillsFields];

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={3}>
        {skillsFields.map((field) => {
          const { title, radioName, textFieldName } = field;

          return (
            <Grid item xs={12} key={title}>
              <RatingInput
                title={title}
                radioName={radioName}
                ratingValue={props[radioName] as RatingScore}
                textFieldName={textFieldName}
                noteValue={props[textFieldName] as string}
                onChange={onChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
