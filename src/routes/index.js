import React from "react";
import { Route, Switch } from "react-router";
import Index from "../pages/index";
import Mercado from "../pages/mercado";
import NoMatch from "../components/noMatch";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Index} />
      {/* <Route path="/mercado/" component={Mercado} /> */}
      <Route path="/mercado/:section" component={Mercado} />
      <Route path="/mercado/" component={Mercado} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
