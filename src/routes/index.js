import React from "react";
import { Route, Switch } from "react-router";
import Index from "../pages/index";
import NoMatch from "../components/noMatch";

const routes = (
  <div>
    <Switch>
      <Route exact path="/a" component={Index} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
