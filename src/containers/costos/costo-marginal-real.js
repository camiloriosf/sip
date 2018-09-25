// @flow

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Line from "../../components/line";
import ChipSelect from "../../components/chip-select";
import TimeFilter from "../../components/time-filter";
import MoneyFilter from "../../components/money-filter";
import { costosActions } from "../../_actions";

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
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit
  }
});

type Props = {
  classes: Object
};

type State = {};

class Costos extends React.Component<Props, State> {
  handleChange = value => {
    this.props.setSelectedBarras(value);
  };
  handleTimeFilter = event => {
    this.props.setTimeFilter(event.target.value);
  };
  handleMoneyFilter = event => {
    this.props.setMoneyFilter(event.target.value);
  };
  render() {
    const { classes, barras, costos, fetchCostosMarginalesReales } = this.props;
    const { items } = barras;
    const { marginalReal } = costos;
    const { selected, timeFilter, moneyFilter } = marginalReal;
    return (
      <div className={classes.root}>
        <Grid
          alignItems="flex-start"
          justify="space-around"
          container
          spacing={16}
        >
          <Grid item xs={3}>
            <TimeFilter
              value={timeFilter}
              handleChange={this.handleTimeFilter}
            />
            <MoneyFilter
              value={moneyFilter}
              handleChange={this.handleMoneyFilter}
            />
            <ChipSelect
              options={items}
              selected={selected}
              handleChange={this.handleChange}
            />
            <Button
              color="primary"
              variant="extendedFab"
              fullWidth
              className={classes.button}
              onClick={fetchCostosMarginalesReales}
            >
              Actualizar
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Line data={data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSelectedBarras: costosActions.setSelectedBarras,
  setTimeFilter: costosActions.setTimeFilter,
  setMoneyFilter: costosActions.setMoneyFilter,
  fetchCostosMarginalesReales: costosActions.fetchCostosMarginalesReales
};

const mapStateToProps = state => {
  return {
    barras: state.barras,
    costos: state.costos
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Costos));
