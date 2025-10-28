import { ref } from "vue";

export function validateBeforeSubmit() {
  const errors = ref({});

  function validate(fields) {
    errors.value = {};

    for (const fieldName in fields) {
      const value = fields[fieldName];

      if (!value) {
        errors.value[fieldName] = true;
      }
    }

    const isValid = Object.keys(errors.value).length === 0;

    if (!isValid) {
      setTimeout(() => {
        errors.value = {};
      }, 3000);
    }

    return isValid;
  }

  return {
    errors,
    validate
  };
}
