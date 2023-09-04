import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store"; // Import your Redux store and persistor
import App from "./App.jsx";
import "./index.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
