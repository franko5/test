import produce from "immer";
import {
  SET_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
  REMOVE_NOTIFICATION,
  UNSET_NOTIFICATIONS,
  SENDING_NOTIFICATIONS_REQUEST,
} from "../actions/notifications";

const deepmerge = require("deepmerge");

const initialData = require("src/resources/demoData/notifications.json");

const initialState = {
  data: initialData,
  loaded: false,
  timestamp: 0,
  sendingRequest: false,
};

/* eslint-disable */
const notifications = produce((draft, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      {
        draft.data = action.payload.data;
        draft.loaded = action.payload.loaded;
        draft.timestamp = action.payload.timestamp;
      }
      break;

    case UPDATE_NOTIFICATIONS:
      {
        draft.data = deepmerge(draft.data, action.payload.data);
        draft.timestamp = action.payload.timestamp;
      }
      break;

    case REMOVE_NOTIFICATION:
      {
        for (let i = 0; i < draft.data.length; i++) {
          if (draft.data[i].id === action.payload.id) {
            draft.data[i].splice(i, 1);
            break;
          }
        }
        draft.timestamp = action.payload.timestamp;
      }
      break;

    case UNSET_NOTIFICATIONS:
      {
        draft.data = initialState.data;
        draft.loaded = initialState.loaded;
        draft.timestamp = initialState.timestamp;
        draft.sendingRequest = initialState.sendingRequest;
      }
      break;

    case SENDING_NOTIFICATIONS_REQUEST:
      {
        draft.sendingRequest = action.payload;
      }
      break;

    default:
      break;
  }
}, initialState);
/* eslint-enable */

export default notifications;
