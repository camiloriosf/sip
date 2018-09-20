//@flow

import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import routes from "./routes";
import AppBar from "./components/appBar";

const App = ({ history }) => {
  return (
    <AppBar>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </AppBar>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
