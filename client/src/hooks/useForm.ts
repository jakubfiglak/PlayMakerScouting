import { useState } from 'react';
import { OnChangeFn } from '../types/common';

export const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const onInputChange: OnChangeFn = (e) => {
    setFormData({
      ...formData,
      [e.target.name!]: e.target.value,
    });
  };

  return [formData, onInputChange, setFormData] as const;
};
