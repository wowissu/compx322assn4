import { useMemo, useState } from 'react';

/**
 * Custom hook to filter data based on a filter function and sieve value.
 *
 * @param {Array} data - The data array to be filtered.
 * @param {Function} filterFn - The filter function that takes the sieve as a parameter and returns a filtering function.
 * @returns {[Array, Function]} - Returns the filtered data and a function to set the sieve.
 */
export default function useFilter(data, filterFn) {
  // State to store the sieve value used for filtering
  const [sieve, setSieve] = useState(null);

  // Memoize the filtered data to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    return (filterFn && data && data.length && sieve !== null) ? data.filter(filterFn(sieve)) : data;
  }, [data, filterFn, sieve]);

  return [filteredData, setSieve];
}
