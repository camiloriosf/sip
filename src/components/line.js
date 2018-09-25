// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";

const styles = (theme: Object) => ({
  root: {
    // marginTop: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  graph: {
    width: "90%"
  }
});

type Props = {
  classes: Object,
  data: Object
};

type State = {};

class Costos extends React.Component<Props, State> {
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.graph}>
          <Line data={data} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Costos);
