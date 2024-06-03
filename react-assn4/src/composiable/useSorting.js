import { useState } from 'react';

/**
 * Custom hook to manage sorting state.
 *
 * @param {string} [dColumn] - The default column to sort by.
 * @param {number} [dSort] - The default sort order (1 for ascending, -1 for descending, 0 for no sort).
 * @returns {[Object, Object]} - Returns the current sorting state and an object with methods to update the sorting state.
 */
export default function useSorting(dColumn, dSort) {
  const defaultSorting = { column: dColumn ?? null, sort: dSort ?? 0 };
  const [sorting, setSorting] = useState(defaultSorting);

  /**
   * Sets the column for sorting.
   *
   * @param {string} column - The column to sort by.
   */
  function setColumn(column) {
    setSorting(Object.assign({}, sorting, { column }));
  }

  /**
   * Sets the sort order.
   *
   * @param {number} sort - The sort order (1 for ascending, -1 for descending).
   */
  function setSort(sort) {
    setSorting(Object.assign({}, sorting, { sort }));
  }

  /**
   * Restores the default sorting state.
   */
  function restore() {
    setSorting(defaultSorting);
  }

  return [sorting, {
    setColumn,
    setSort,
    setSorting,
    restore
  }];
}
