import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';
import ClubsState from '../../context/clubs/ClubsState';
import ClubsContent from '../content/ClubsContent';

const Clubs: React.FC = () => {
  useAuthorization();

  return (
    <ClubsState>
      <MainTemplate>
        <ClubsContent />
      </MainTemplate>
    </ClubsState>
  );
};

export default Clubs;
