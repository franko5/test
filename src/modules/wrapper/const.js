import React from "react";

import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";

export const pages = {
  README: "/",
  NOTIFICATIONS: "/notifications",
};

export const links = [
  {
    icon: <DescriptionIcon />,
    label: "Readme",
    page: pages.README,
  },
  {
    icon: <NotificationsIcon />,
    label: "Notifications",
    page: pages.NOTIFICATIONS,
  },
];
