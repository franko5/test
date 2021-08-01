import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";

import notifications from "./reducers/notifications";

const enMessages = require("src/locale/airq/en_US/messages.json");

const additionalMiddlewares = [];

if (process.env.NODE_ENV === `development`) {
  /* eslint-disable global-require */
  const { logger } = require(`redux-logger`);
  /* eslint-enable global-require */

  additionalMiddlewares.push(logger);
}

const rootReducer = combineReducers({
  reducer: combineReducers({ notifications }),
  intl: intlReducer,
});

const preloadedState = {
  intl: {
    locale: "en",
    messages: enMessages,
    icons: Object.keys(enMessages)
      .filter((key) => key.startsWith("sensoricon."))
      .reduce((res, key) => {
        res[key] = enMessages[key];
        return res;
      }, {}),
  },
};

export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: additionalMiddlewares,
    preloadedState,
  });

  return { store };
};
