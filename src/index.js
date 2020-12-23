import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
    </ActionCableProvider>
  </Provider>,
  document.getElementById("root")
);
