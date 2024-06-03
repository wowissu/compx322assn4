import { useEffect } from 'react';

/**
 * Custom hook to handle the Escape key press event.
 *
 * @param {Function} callback - The function to call when the Escape key is pressed.
 * @param {Array} [deps=[]] - The dependency array for the useEffect hook.
 */
export function useEsc(callback, deps = []) {
  useEffect(() => {
    /**
     * Event handler for the Escape key press event.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     */
    function onEsc(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    // Add the event listener for the Escape key press
    document.addEventListener("keyup", onEsc);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keyup", onEsc);
    };
  }, deps); // Dependency array for useEffect
}
