import { useState } from 'react';


export default function useSorting(dColumn, dSort) {
  const defaultSotring = { column: dColumn ?? null, sort: dSort ?? 0 }
  const [sorting, setSorting] = useState(defaultSotring);

  function setColumn(column) {
    setSorting(Object.assign({}, sorting, {column}));
  }

  function setSort (sort) {
    setSorting(Object.assign({}, sorting, {sort}));
  }

  function restore() {
    setSorting(defaultSotring);
  }

  return [sorting, {
    setColumn,
    setSort,
    setSorting,
    restore
  }];
}