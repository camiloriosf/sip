// @flow

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Line from "../../components/line";
import ChipSelect from "../../components/chip-select";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const styles = theme => ({
  root: {
    marginTop: 20,
    maxWidth: 800
  }
});

type Props = {
  classes: Object
};

type State = {};

class Costos extends React.Component<Props, State> {
  state = {
    selected: []
  };
  handleChange = value => {
    this.setState({
      selected: value
    });
  };
  render() {
    const { classes, barras } = this.props;
    const { selected } = this.state;
    const { items } = barras;
    return (
      <div className={classes.root}>
        <ChipSelect
          options={items}
          selected={selected}
          handleChange={this.handleChange}
        />
        <Line data={data} />
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    barras: state.barras
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Costos));
