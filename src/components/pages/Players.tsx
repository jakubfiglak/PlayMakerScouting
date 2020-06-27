import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import SectionTitle from '../common/SectionTitle/SectionTitle';
import PlayersTable from '../players/PlayersTable';

const Players: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <SectionTitle>Zawodnicy</SectionTitle>
      <PlayersTable />
    </MainTemplate>
  );
};

export default Players;
