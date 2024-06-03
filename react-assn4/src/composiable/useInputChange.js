import { useMemo } from 'react';

export function useInputChange(setValue, column) {
  const inputChangeHandler = useMemo(
    () => (e) => {
      setValue({ [column]: e.target.value });
    },
    [setValue, column]
  );

  return inputChangeHandler;
}