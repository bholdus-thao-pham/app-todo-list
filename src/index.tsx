import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TaskContextProvider from "./task-context";
import { Provider } from "react-redux";
import store, { persiststore } from "./store/index";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./utils";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persiststore}>
      <TaskContextProvider>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </TaskContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
