import { useState } from 'react';

const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return [formData, onInputChange] as const;
};

export default useForm;
