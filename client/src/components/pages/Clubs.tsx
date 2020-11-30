import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { ClubsContent } from '../content';
import { ClubsState } from '../../context';
import { useAuthorization } from '../../hooks';

export const Clubs = () => {
  // useAuthorization();

  return (
    <ClubsState>
      <MainTemplate>
        <ClubsContent />
      </MainTemplate>
    </ClubsState>
  );
};
