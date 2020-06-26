import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Home: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};

export default Home;
