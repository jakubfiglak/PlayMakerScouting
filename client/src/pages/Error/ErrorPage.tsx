import React from 'react';
import { AuthTemplate } from '../../templates/AuthTemplate';

type Props = {
  error: Error;
};

export const ErrorPage = ({ error }: Props) => {
  return (
    <AuthTemplate title="Przepraszamy, coś poszło nie tak">
      <div role="alert">
        <pre>{error.message}</pre>
      </div>
    </AuthTemplate>
  );
};
