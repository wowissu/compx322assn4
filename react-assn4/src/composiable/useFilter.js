import { useMemo, useState } from 'react';


export default function useFilter(data, filterFn) {

  const [sieve, setSieve] = useState(null);

  const filteredData = useMemo(() => {
    return (filterFn && data && data.length && sieve !== null) ? data.filter(filterFn(sieve)) : data;
  }, [data, filterFn, sieve]);

  return [filteredData, setSieve];
}