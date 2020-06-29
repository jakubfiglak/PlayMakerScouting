import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import SectionTitle from '../common/SectionTitle/SectionTitle';
import PlayersTable from '../players/PlayersTable';
import PlayersState from '../../context/players/PlayersState';

const Players: React.FC = () => {
  useAuthorization();

  return (
    <PlayersState>
      <MainTemplate>
        <SectionTitle>Zawodnicy</SectionTitle>
        <PlayersTable />
      </MainTemplate>
    </PlayersState>
  );
};

export default Players;
