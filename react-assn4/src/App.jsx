import { RecoilRoot } from "recoil";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import EventPage from "./EventPage";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <EventPage />
          </React.Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  );
}
