import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import PlayersState from '../../context/players/PlayersState';
import PlayersContent from '../content/PlayersContent';

const Players: React.FC = () => {
  useAuthorization();

  return (
    <PlayersState>
      <MainTemplate>
        <PlayersContent />
      </MainTemplate>
    </PlayersState>
  );
};

export default Players;
