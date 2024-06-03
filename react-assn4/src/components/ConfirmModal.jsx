import { createPortal } from "react-dom";
import { useEsc } from "../composiable/useEscTrigger";
import { useModal } from "../composiable/useModal";

/**
 * ConfirmModal component for displaying a confirmation dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.show - Whether to show the modal.
 * @param {Function} [props.onOK] - Callback to handle confirmation.
 * @param {Function} [props.onCancel] - Callback to handle cancellation.
 * @param {Function} [props.onClickOutside] - Optional callback for clicks outside the modal.
 * @param {boolean} [props.clickOutsideToClose=false] - Whether to close the modal on outside click.
 * @param {string} props.title - The title of the modal.
 * @param {React.ReactNode} [props.children] - Optional children elements to render inside the modal.
 * @returns {JSX.Element|null} - The rendered modal component or null if not shown.
 */
export default function ConfirmModal(props) {
  const { emitClickOutside, emitCancel, emitOK } = useModal(props);

  // Close the modal when the Escape key is pressed
  useEsc(emitCancel);

  return props.show
    ? createPortal(
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
                  {props.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"></p>

                <form className="mt-4" action="#">
                  <div className="space-y-3">{props.children ?? null}</div>

                  <div className="mt-16 sm:flex sm:items-center sm:-mx-2">
                    <button
                      type="button"
                      onClick={emitCancel}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={emitOK}
                      className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}
