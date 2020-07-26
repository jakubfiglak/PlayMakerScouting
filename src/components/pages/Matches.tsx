import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import MatchesState from '../../context/matches/MatchesState';
import MatchesContent from '../content/MatchesContent';

const Clubs: React.FC = () => {
  useAuthorization();

  return (
    <MatchesState>
      <MainTemplate>
        <MatchesContent />
      </MainTemplate>
    </MatchesState>
  );
};

export default Clubs;
