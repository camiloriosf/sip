// @flow

import React from "react";
import ReactDOM from "react-dom";
import Index from "./pages/index";
import AppBar from "./components/appBar";

// $FlowIgnore - we don't want the missing dom element to be a silent error.
ReactDOM.render(
  <AppBar>
    <Index />
  </AppBar>,
  document.querySelector("#root")
);
