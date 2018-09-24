// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";

const styles = (theme: Object) => ({
  root: {
    marginTop: 20
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
        <Line data={data} />
      </div>
    );
  }
}

export default withStyles(styles)(Costos);
