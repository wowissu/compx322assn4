import { RecoilRoot } from "recoil";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import EventPage from "./EventPage";

/**
 * The main App component that sets up the Recoil state management,
 * error boundaries, and suspense fallback for lazy-loaded components.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function App() {
  return (
    <>
      {/* Initialize Recoil state management */}
      <RecoilRoot>
        {/* Error boundary to catch and handle errors in child components */}
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          {/* Suspense fallback for lazy-loaded components */}
          <React.Suspense fallback={<div>Loading...</div>}>
            <EventPage />
          </React.Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  );
}
