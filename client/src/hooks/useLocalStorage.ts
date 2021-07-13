import { useState } from 'react';

type Args<ValueType> = {
  key: string;
  initialValue: ValueType;
};

export function useLocalStorage<ValueType>({
  key,
  initialValue,
}: Args<ValueType>) {
  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: ValueType | ((val: ValueType) => ValueType)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
