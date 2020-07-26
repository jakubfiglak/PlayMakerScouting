import { useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const onInputChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | {
          name?: string | undefined;
          value: unknown;
        }
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name!]: e.target.value,
    });
  };

  return [formData, onInputChange, setFormData] as const;
};
