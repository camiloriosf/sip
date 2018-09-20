// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = (theme: Object) => ({
  root: {}
});

type Props = {
  classes: Object
};

type State = {
  value: number
};

class Costos extends React.Component<Props, State> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper square>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Costo Marginal Online" />
            <Tab label="Costo Marginal Programado" />
            <Tab label="Costo Marginal Real" />
            <Tab label="Desviaciones" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Costos);
