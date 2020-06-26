import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Clubs: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Clubs</h1>
    </MainTemplate>
  );
};

export default Clubs;
