type SourceType = {
  value: string | number;
  label: string;
}[];

export const getLabel = (value: string | number | null, source: SourceType) => {
  const element = source.find((el) => el.value === value);
  if (element) {
    return element.label;
  }
  if (value) {
    return value.toString();
  }

  return null;
};
