import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import * as service from "./services";
import { useMemo } from 'react';
import useSorting from './composiable/useSorting';

// Atom for forcing updates to event data
export const forceUpdateEventAtom = atom({
  key: "forceUpdateEventAtom",
  default: 0,
});

// Selector for fetching all event data
export const allEventSelector = selector({
  key: 'allEventSelector',
  get: async ({ get }) => {
    get(forceUpdateEventAtom); // Re-fetch events when this atom updates
    
    const response = await service.getAllEvents();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
});

export const NameColumn = 'name';
export const StartDateColumn = 'startdate';
export const EndDateColumn = 'enddate';
export const ASCENDING = 1;
export const DESCENDING = -1;

// Sorting handlers for columns
const columnSortingMap = {
  [StartDateColumn]: {
    [DESCENDING]: (a, b) => new Date(b.startdate).getTime() - new Date(a.startdate).getTime(),
    [ASCENDING]: (a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
  },  
  [EndDateColumn]: {
    [DESCENDING]: (a, b) => new Date(b.startdate).getTime() - new Date(a.startdate).getTime(),
    [ASCENDING]: (a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
  },  
}

/**
 * Custom hook to manage events with sorting, creating, and removing capabilities.
 *
 * @returns {Object} The events and related functions.
 */
export default function useEvents() {
  const [sorting, { setSorting, restore: restoreSorting }] = useSorting();
  const forceUpdateEvent = useSetRecoilState(forceUpdateEventAtom);
  const events = useRecoilValue(allEventSelector);

  // Memoize the sorted events
  const sortedEvents = useMemo(() => {
    if (sorting.sort === 0 || sorting.column === null) {
      return events;
    }

    const sortingHandler = columnSortingMap[sorting.column]?.[sorting.sort];

    return sortingHandler ? [...events].sort(sortingHandler) : events;
  }, [events, sorting, sorting.column, sorting.sort]);

  /**
   * Refresh the event data.
   */
  function refresh() {
    forceUpdateEvent(n => n + 1);
  }

  /**
   * Remove an event and refresh the event data.
   * 
   * @param {Object} event - The event to remove.
   */
  async function removeEvent(event) {
    await service.deleteEvent(event.id);   
    refresh();
  }

  /**
   * Create a new event and refresh the event data.
   * 
   * @param {Object} event - The event to create.
   */
  async function createEvent(event) {
    await service.createEvent(event);   
    refresh();
  }

  return {
    events: sortedEvents,
    sorting,
    refresh,
    removeEvent,
    createEvent,
    sortEvents: setSorting,
    restoreSorting
  }
}
