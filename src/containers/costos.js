// @flow

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CostoMarginalReal from "./costos/costo-marginal-real";
import { barrasActions } from "../_actions";

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
  componentDidMount = () => {
    this.props.getBarras();
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  renderContent = () => {
    const { value } = this.state;
    switch (value) {
      case 0:
        return <CostoMarginalReal />;
      default:
        return null;
    }
  };
  render() {
    const { classes, barras } = this.props;
    console.log(barras);
    return (
      <div className={classes.root}>
        <Paper square>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            {/* <Tab label="Costo Marginal Online" /> */}
            {/* <Tab label="Costo Marginal Programado" /> */}
            <Tab label="Costo Marginal Real" />
            {/* <Tab label="Desviaciones" /> */}
          </Tabs>
        </Paper>
        {this.renderContent()}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getBarras: barrasActions.getBarras
};

const mapStateToProps = state => {
  return {
    barras: state.barras
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Costos));
