import EventList from "./components/EventList";
import AppHeader from "./layouts/AppHeader";
import Button from "./components/Button";
import IconCirclePlus from "./components/icons/IconCirclePlus";
import React, { useState } from "react";
import { CreateEventModal } from "./components/EventModal";
import ConfirmModal from "./components/ConfirmModal";
import useEvents from "./event.store";
import Search from "./components/Search";
import useFilter from "./composiable/useFilter";

export default function Start() {
  const { events, removeEvent, createEvent, sortEvents } = useEvents();
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [eventToBeDeleted, setEventToBeDeleted] = useState(null);
  const showDeleteConfirmModal = eventToBeDeleted != null;
  const [filteredEvents, setSieve] = useFilter(events, (sieve) => {
    if (Object.values(sieve).every((n) => n.length === 0)) {
      return () => true;
    } else {
      return (event) =>
        (sieve.name && event.name.indexOf(sieve.name) >= 0) ||
        (sieve.description &&
          event.description.indexOf(sieve.description) >= 0);
    }
  });

  function openRemoveConfirm(event) {
    setEventToBeDeleted(event);
  }

  async function closeConfirmAndRemoveEvent(event) {
    setEventToBeDeleted(null);
    await removeEvent(event);
  }

  async function createEventAndCloseModal(event) {
    await createEvent(event);
    setShowCreateEventModal(null);
  }

  function onSortStartDate(sorting) {
    sortEvents(sorting);
  }

  return (
    <>
      <ConfirmModal
        title="Delete Confirm"
        show={showDeleteConfirmModal}
        onOK={() => closeConfirmAndRemoveEvent(eventToBeDeleted)}
        onCancel={() => setEventToBeDeleted(null)}
      >
        Confrim to delete the Event
      </ConfirmModal>
      <div className="max-w-[1280px] mx-auto overflow-hidden">
        <AppHeader />
        <main className="pb-32">
          <section className="container px-4 mx-auto space-y-8">
            <Search onSubmit={setSieve}></Search>

            <div>
              <div className="flex justify-between">
                <div className="">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    Event List
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Click "Create Event" Button on right to create event.
                  </p>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      setShowCreateEventModal(!showCreateEventModal)
                    }
                  >
                    <IconCirclePlus />
                    <span className="mx-1">Create Event</span>
                  </Button>
                  <CreateEventModal
                    show={showCreateEventModal}
                    onClose={() => setShowCreateEventModal(false)}
                    onSubmit={createEventAndCloseModal}
                  />
                </div>
              </div>

              <EventList
                data={filteredEvents}
                onDelete={openRemoveConfirm}
                onSort={onSortStartDate}
              ></EventList>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
