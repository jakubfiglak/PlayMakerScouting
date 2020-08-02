import React, { useEffect } from 'react';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { PlayersSelect } from '../selects';
import { Loader } from '../../common';
// Hooks
import { useSimplifiedDataState } from '../../../context';

export const MatchStep = () => {
  const simplifiedDataContext = useSimplifiedDataState();

  const { loading, getPlayers, playersData } = simplifiedDataContext;

  useEffect(() => {
    console.log('Wybierz mecz');
  }, []);

  return (
    <>
      <p>wybierz mecz</p>
    </>
  );
};
