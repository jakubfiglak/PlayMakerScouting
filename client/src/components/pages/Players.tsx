import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { PlayersContent } from '../content';
import { PlayersState, ClubsState } from '../../context';

export const Players: React.FC = () => {
  return (
    <PlayersState>
      <ClubsState>
        <MainTemplate>
          <PlayersContent />
        </MainTemplate>
      </ClubsState>
    </PlayersState>
  );
};
