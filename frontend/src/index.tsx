import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./store/globalstate";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
