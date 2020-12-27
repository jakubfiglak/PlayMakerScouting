import React from 'react';

type Props = {
  error: Error;
};

export const ErrorFallback = ({ error }: Props) => {
  return (
    <div role="alert">
      <p>Something went wrong: </p>
      <pre>{error.message}</pre>
    </div>
  );
};
