import React, { useEffect } from 'react';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { PlayersSelect } from '../selects';
import { Loader } from '../../common';
// Hooks
import { useSimplifiedDataState } from '../../../context';

export const PlayerStep = () => {
  const simplifiedDataContext = useSimplifiedDataState();

  const { loading, getPlayers, playersData } = simplifiedDataContext;

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <FormControl variant="outlined" fullWidth>
        <PlayersSelect playersData={playersData} />
      </FormControl>
    </>
  );
};
