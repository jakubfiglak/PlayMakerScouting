import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { MatchesContent } from '../components/content';
import { MatchesState } from '../context';

export const Matches = () => {
  return (
    <MatchesState>
      <MainTemplate>
        <MatchesContent />
      </MainTemplate>
    </MatchesState>
  );
};
