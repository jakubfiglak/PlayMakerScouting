import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Matches: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Matches</h1>
    </MainTemplate>
  );
};

export default Matches;
