import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { ClubsContent } from '../components/content';
import { ClubsState } from '../context';

export const Clubs = () => {
  return (
    <ClubsState>
      <MainTemplate>
        <ClubsContent />
      </MainTemplate>
    </ClubsState>
  );
};
