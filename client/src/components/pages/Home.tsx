import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { useAuthorization } from '../../hooks';

export const Home = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};
