import { voivodeships } from '../data';

export const getVoivodeshipLabel = (voivodeship: string) => {
  const voivodObj = voivodeships.find(
    (voivod) => voivod.value.toLowerCase() === voivodeship.toLowerCase(),
  );
  return voivodObj?.label;
};
