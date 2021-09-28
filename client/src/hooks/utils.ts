export function getErrorMessage(message: string) {
  return `Coś poszło nie tak: ${message}`;
}

type CreateOrUpdateSuccessArgs = {
  type: string;
  name: string;
};

export function getCreateSuccessMessage({
  type,
  name,
}: CreateOrUpdateSuccessArgs) {
  return `Pomyślnie utworzono ${type} ${name}`;
}

export function getUpdateSuccessMessage({
  type,
  name,
}: CreateOrUpdateSuccessArgs) {
  return `Pomyślnie zaktualizowano ${type} ${name}`;
}

type DeleteSuccessArgs = {
  type: string;
  id: string;
};

export function getDeleteSuccessMessage({ type, id }: DeleteSuccessArgs) {
  return `Pomyślnie usunięto ${type} o id ${id}`;
}
