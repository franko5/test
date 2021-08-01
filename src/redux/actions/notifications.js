export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const UNSET_NOTIFICATIONS = "UNSET_NOTIFICATIONS";
export const SENDING_NOTIFICATIONS_REQUEST = "SENDING_NOTIFICATIONS_REQUEST";

export function setNotifications(data) {
  return {
    type: SET_NOTIFICATIONS,
    payload: data,
  };
}

export function updateNotifications(data) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: data,
  };
}

export function removeNotification(data) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: data,
  };
}

export function unsetNotifications() {
  return {
    type: UNSET_NOTIFICATIONS,
    payload: null,
  };
}

export function sendingNotificationsRequest(sending) {
  return {
    type: SENDING_NOTIFICATIONS_REQUEST,
    payload: sending,
  };
}
