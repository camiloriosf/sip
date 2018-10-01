// @flow

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import rColor from "random-color";
import Line from "../../components/line";
import ChipSelect from "../../components/chip-select";
import TimeFilter from "../../components/time-filter";
import MoneyFilter from "../../components/money-filter";
import DateFilter from "../../components/date-filter";
import { costosActions } from "../../_actions";

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
  componentDidUpdate = () => {
    console.log("updated");
  };
  handleChange = value => {
    this.props.setSelectedBarras(value);
  };
  handleTimeFilter = event => {
    this.props.setTimeFilter(event.target.value);
  };
  handleMoneyFilter = event => {
    this.props.setMoneyFilter(event.target.value);
  };
  handleDateChange = (name: string) => (value: string) => {
    this.props.setDateFilter({ name, value });
  };
  renderData = ({
    selected,
    timeFilter,
    timeMap,
    moneyFilter,
    from,
    to,
    results
  }: {
    selected: Array<Object>,
    timeFilter: string,
    timeMap: Object,
    moneyFilter: string,
    from: string,
    to: string,
    results: Object
  }) => {
    try {
      const labels = [];
      const datasets = [];
      const fromDate = from
        .clone()
        .startOf(timeMap[timeFilter] === "h" ? "d" : timeMap[timeFilter]);
      const toDate = to
        .clone()
        .endOf(timeMap[timeFilter] === "h" ? "d" : timeMap[timeFilter]);
      let safe = 0;
      while (safe < 200000 && !fromDate.isSameOrAfter(toDate)) {
        fromDate.add(1, timeMap[timeFilter]);
        if (timeFilter === "hourly") {
          const date = fromDate.format("YYYY-MM-DD");
          const time = fromDate.format("HH:mm");
          if (time === "23:00") {
            labels.push(`${date} ${time}`);
            labels.push(`${date} 24:00`);
          } else if (time !== "00:00") {
            labels.push(`${date} ${time}`);
          }
        }
        safe++;
      }

      for (const item of selected) {
        if (
          results[item.mnemotecnico] &&
          results[item.mnemotecnico][timeFilter]
        ) {
          const color = rColor();
          const dataset = {
            fill: false,
            lineTension: 0.1,
            borderColor: color.rgbString(),
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: color.rgbString(),
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color.rgbString(),
            pointHoverBorderColor: color.rgbString(),
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
          };
          const barra = results[item.mnemotecnico][timeFilter];
          dataset["label"] = item.nombre;
          dataset["data"] = [];
          for (const label of labels) {
            if (barra[label]) {
              dataset["data"].push(barra[label][moneyFilter]);
            } else {
              dataset["data"].push(0);
            }
          }
          datasets.push(dataset);
        }
      }
      return { labels, datasets };
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { classes, barras, costos, fetchCostosMarginalesReales } = this.props;
    const { items } = barras;
    const { marginalReal } = costos;
    const {
      selected,
      timeFilter,
      timeMap,
      moneyFilter,
      from,
      to,
      results
    } = marginalReal;

    const data = this.renderData({
      selected,
      timeFilter,
      timeMap,
      moneyFilter,
      from,
      to,
      results
    });
    // console.log(data1);
    return (
      <div className={classes.root}>
        <Grid
          alignItems="flex-start"
          justify="space-around"
          container
          spacing={16}
        >
          <Grid item xs={12} md={3}>
            <DateFilter
              from={from}
              to={to}
              handleDateChange={this.handleDateChange}
            />
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
          <Grid item xs={12} md={9}>
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
  setDateFilter: costosActions.setDateFilter,
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
