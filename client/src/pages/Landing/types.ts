import { ReactNode } from 'react';

export type Advantage = {
  title: string;
  icon: ReactNode;
  text: string;
};

export type Value = {
  number: string;
  title: string;
  icon: ReactNode;
  values: string[];
};
