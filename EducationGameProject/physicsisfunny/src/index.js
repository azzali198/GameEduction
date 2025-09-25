import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
// SAFELY defer all ResizeObserver callbacks to the next animation frame.
// This breaks the synchronous layout feedback loop that Chrome warns about.
(function () {
  if (typeof window === 'undefined' || !window.ResizeObserver) return;
  const RO = window.ResizeObserver;
  window.ResizeObserver = class extends RO {
    constructor(callback) {
      let rafId = null;
      super((entries, observer) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          // Optional: filter out no-op entries to avoid redundant state updates
          callback(entries, observer);
        });
      });
    }
  };
})();

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
