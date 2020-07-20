import { voivodeships } from '../data';

export const replaceVoivodeshipName = (
  voivodeship: string,
  returnValue: 'slug' | 'label',
) => {
  const voivodObj = voivodeships.find(
    (voivod) => voivod.value.toLowerCase() === voivodeship.toLowerCase(),
  );
  return voivodObj?.[returnValue];
};
