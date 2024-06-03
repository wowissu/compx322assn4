import { useCallback, useState } from 'react';

/**
 * Custom hook to manage state with merging capabilities.
 *
 * @param {Object} dValue - The initial state value.
 * @returns {[Object, Function]} - Returns the current state and a function to merge the state with a partial value.
 */
export function useMergeState(dValue) {
  const [value, setValue] = useState(dValue);

  /**
   * Function to merge the current state with a partial value.
   *
   * @param {Object} partialValue - The partial value to merge into the current state.
   */
  const setMergeValue = useCallback((partialValue) => {
    setValue(prevValue => Object.assign({}, prevValue, partialValue));
  }, [setValue]);

  return [value, setMergeValue];
}
