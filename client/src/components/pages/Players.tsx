import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { PlayersContent } from '../content';
import { PlayersState } from '../../context';
import { useAuthorization } from '../../hooks';

export const Players: React.FC = () => {
  // useAuthorization();

  return (
    <PlayersState>
      <MainTemplate>
        <PlayersContent />
      </MainTemplate>
    </PlayersState>
  );
};
