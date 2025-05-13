import { useState } from "react";

type FormState<T> = {
  [K in keyof T]: T[K];
};

export const useForm = <T extends Record<string, any>>(initialForm: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialForm);

  const InputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormState(initialForm);
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  return {
    ...formState,
    setFieldValue,
    formState,
    InputChange,
    resetForm,
  };
};