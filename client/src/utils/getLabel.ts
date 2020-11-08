type SourceType = {
  value: string;
  label: string;
}[];

export const getLabel = (value: string | null, source: SourceType) => {
  const element = source.find((el) => el.value === value);
  if (element) {
    return element.label;
  }
  if (value) {
    return value;
  }

  return null;
};
