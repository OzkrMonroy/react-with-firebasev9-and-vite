import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formChanged, setFormChanged] = useState(false);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Campo no válido"] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
    setFormChanged(true);
  };

  const isFormValid = useMemo(() => {
    for (const formField of Object.keys(formValidation)) {
      if (formValidation[formField] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    isFormValid,
    formChanged,
    onInputChange,
    onResetForm,
  };
};
