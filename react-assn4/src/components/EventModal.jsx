import { createPortal } from "react-dom";
import { useEsc } from "../composiable/useEscTrigger";
import { useModal } from "../composiable/useModal";
import { useMergeState } from "../composiable/useMergeState";

function Modal(props) {
  const [value, setValue] = useMergeState(props.value);
  const { emitClickOutside, emitClose, emit } = useModal(props);
  const emitSubmit = emit("onSubmit");
  useEsc(emitClose, []);

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute min-h-screen w-full bg-gray-600/20"
          onClick={emitClickOutside}
        ></div>
        <div className="relative flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <h3
              className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
              id="modal-title"
            >
              Create event
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"></p>

            <form className="mt-4" action="#">
              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-200">
                    Name
                  </label>

                  <label className="block mt-3" htmlFor="name">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Event name"
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={value.name}
                      onChange={(e) => setValue({ name: e.target.value })}
                    />
                  </label>
                </div>
                {/* Description */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-200">
                    Description
                  </label>

                  <label className="block mt-3" htmlFor="name">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      placeholder="..."
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={value.description}
                      onChange={(e) =>
                        setValue({ description: e.target.value })
                      }
                    />
                  </label>
                </div>
                {/* start date */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-200">
                    Start Date
                  </label>

                  <label className="block mt-3" htmlFor="name">
                    <input
                      type="datetime-local"
                      name="startdate"
                      id="startdate"
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={value.startdate}
                      onChange={(e) => setValue({ startdate: e.target.value })}
                    />
                  </label>
                </div>
                {/* end date */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-200">
                    End Date
                  </label>

                  <label className="block mt-3" htmlFor="name">
                    <input
                      type="datetime-local"
                      name="enddate"
                      id="enddate"
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={value.enddate}
                      onChange={(e) => setValue({ enddate: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-16 sm:flex sm:items-center sm:-mx-2">
                <button
                  type="button"
                  onClick={emitClose}
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => emitSubmit(value)}
                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export function CreateEventModal(props) {
  const emptyEvent = {
    name: "",
    description: "",
    startdate: "",
    enddate: "",
  };

  function onSubmit(event) {
    // check form
    for (let attr in event) {
      const content = event[attr];

      if (content === null || content === undefined || content.length === 0) {
        throw new Error(`${attr} is ${content}`);
      }
    }

    props.onSubmit(event);
  }

  return (
    <>
      {props.show ? (
        <Modal {...props} value={emptyEvent} onSubmit={onSubmit} />
      ) : null}
    </>
  );
}
