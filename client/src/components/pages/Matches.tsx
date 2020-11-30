import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { MatchesContent } from '../content';
import { MatchesState } from '../../context';
import { useAuthorization } from '../../hooks';

export const Matches = () => {
  // useAuthorization();

  return (
    <MatchesState>
      <MainTemplate>
        <MatchesContent />
      </MainTemplate>
    </MatchesState>
  );
};
