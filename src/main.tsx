// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/Store.ts";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // <Router basename={import.meta.env.DEV ? "/" : "/travel-price"}>
  <Provider store={store}>
    <App />
  </Provider>
  // </Router>
  // </StrictMode>
);
