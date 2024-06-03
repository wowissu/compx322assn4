import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import * as service from "./services";
import { useMemo } from 'react';
import useSorting from './composiable/useSorting';

export const forceUpdateEventAtom = atom({
  key: "forceUpdateEventAtom",
  default: 0,
});

export const allEventSelector = selector({
  key: 'allEventSelector',
  get: async ({ get }) => {
    get(forceUpdateEventAtom); 
    
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

export default function useEvents() {
  const [sorting, { setSorting, restore: restoreSorting }] = useSorting();
  const forceUpdateEvent = useSetRecoilState(forceUpdateEventAtom)
  const events = useRecoilValue(allEventSelector);
  const sortedEvents = useMemo(() => {
    if (sorting.sort === 0 || sorting.column === null) {
      return events;
    }

    const sortingHandler = columnSortingMap[sorting.column]?.[sorting.sort];

    return sortingHandler ? [...events].sort(sortingHandler) : events;
  }, [events, sorting, sorting.column, sorting.sort])


  function refresh() {
    forceUpdateEvent(n => n + 1);
  }

  async function removeEvent(event) {
    await service.deleteEvent(event.id);   
    refresh();
  }

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