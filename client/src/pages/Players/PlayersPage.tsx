import React from 'react';
import MainTemplate from '../../templates/MainTemplate';
import { PlayersContent } from '../../components/content';

export const PlayersPage: React.FC = () => {
  return (
    <MainTemplate>
      <PlayersContent />
    </MainTemplate>
  );
};
