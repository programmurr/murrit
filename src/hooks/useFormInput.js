import { useState } from 'react';

export default function useFormInput(initialValue) {
  const [ value, setValue ] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClear() {
    setValue("");
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    clear: handleClear
  }
}