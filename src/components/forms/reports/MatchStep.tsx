import React, { useEffect } from 'react';
// MUI components
import { FormControl, SelectProps } from '@material-ui/core';
// Custom components
import { MatchSelect } from '../selects';
import { Loader } from '../../common';
// Hooks
import { usePlayersState } from '../../../context';

type MatchStepProps = {
  player: string;
} & SelectProps;

export const MatchStep = ({ player, value, onChange }: MatchStepProps) => {
  const playersContext = usePlayersState();

  const { loading, getPlayerMatches, playerMatches } = playersContext;

  useEffect(() => {
    getPlayerMatches(player);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <FormControl variant="outlined" fullWidth>
        <MatchSelect
          matchesData={playerMatches}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};
