import { useEffect } from 'react';


export function useEsc(callback, deps = []) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("keyup", onEsc);

    return () => {
      document.removeEventListener("keyup", onEsc);
    };
  }, deps);
}