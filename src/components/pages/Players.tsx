import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Players: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Players Page</h1>
    </MainTemplate>
  );
};

export default Players;
