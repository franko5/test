import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ModulWrapper from "src/modules/wrapper";
import Notifications from "src/modules/notifications";
import Readme from "src/modules/readme";

import { pages } from "src/modules/wrapper/const";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path={`${pages?.README}`}>
        <ModulWrapper>
          <Readme />
        </ModulWrapper>
      </Route>
      <Route exact path={`${pages?.NOTIFICATIONS}`}>
        <ModulWrapper>
          <Notifications />
        </ModulWrapper>
      </Route>
      <Redirect from="*" to={`${pages?.README}`} />
    </Switch>
  </Router>
);

export default AppRouter;
