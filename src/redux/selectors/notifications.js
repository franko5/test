import { createSelector } from "@reduxjs/toolkit";

export const notificationsSelector = (state) => state.reducer.notifications;

export const getData = createSelector(
  [notificationsSelector],
  (notification) => notification?.data || []
);
