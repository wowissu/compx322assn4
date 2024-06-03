import { useCallback, useState } from 'react';

export function useMergeState(dValue) {
  const [value, setValue] = useState(dValue);
  const setMergeValue = useCallback((partialValue) => {

    console.log(Object.assign({}, value, partialValue));

    setValue(Object.assign({}, value, partialValue));
  }, [value, setValue])

  return [value, setMergeValue];
}