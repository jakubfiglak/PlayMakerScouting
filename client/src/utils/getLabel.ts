type SourceType = {
  value: string;
  label: string;
}[];

export const getLabel = (value: string, source: SourceType): string => {
  const element = source.find((el) => el.value === value);
  if (element) {
    return element.label;
  }
  return 'Nieznana wartość';
};
