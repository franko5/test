import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl-redux";
import { configureAppStore } from "./redux";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";

export const { store } = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider store={store} intlSelector={() => store?.getState().intl}>
        <Router />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
