// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withRoot from "../withRoot";
import Costos from "../containers/costos";

const styles = (theme: Object) => ({
  root: {}
});

type Props = {
  classes: Object
};

type State = {
  section: string
};

class Mercado extends React.Component<Props, State> {
  static getDerivedStateFromProps = (props, state) => {
    const { match = {} } = props;
    const { params = {} } = match;
    const { section = "" } = params;
    return { section };
  };
  state = {
    sections: ""
  };

  renderSection = () => {
    const { section } = this.state;
    switch (section) {
      case "costos":
        return <Costos />;
      default:
        return null;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Mercado
        </Typography>
        {this.renderSection()}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Mercado));
