// @flow

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Line from "../../components/line";
import ChipSelect from "../../components/chip-select";
import TimeFilter from "../../components/time-filter";
import MoneyFilter from "../../components/money-filter";
import DateFilter from "../../components/date-filter";
import { costosActions } from "../../_actions";
import { formatService } from "../../_services";
// import myWorker from "../../_workers/test.worker";

const styles = theme => ({
  root: {
    marginTop: 20,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -18,
    marginLeft: -18
  }
});

type Props = {
  classes: Object
};

type State = {};

class Costos extends React.Component<Props, State> {
  // componentDidMount() {
  //   const code = myWorker.toString();
  //   const blob = new Blob(["(" + code + ")()"]);
  //   const worker = new Worker(URL.createObjectURL(blob));
  //   worker.addEventListener("message", event => {
  //     console.log("event: ", event.data);
  //   });
  //   worker.postMessage({ id: 123, name: "asd" });
  // }
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
  formatData = ({
    selected,
    timeFilter,
    moneyFilter,
    from,
    to,
    results
  }: {
    selected: Array<Object>,
    timeFilter: string,
    moneyFilter: string,
    from: string,
    to: string,
    results: Object
  }) => {
    try {
      switch (timeFilter) {
        case "hourly":
          return formatService.hourlyData({
            selected,
            timeFilter,
            moneyFilter,
            from,
            to,
            results
          });
        case "daily":
          return formatService.dailyData({
            selected,
            timeFilter,
            moneyFilter,
            from,
            to,
            results
          });
        case "monthly":
          return formatService.monthlyData({
            selected,
            timeFilter,
            moneyFilter,
            from,
            to,
            results
          });
        case "yearly":
          return formatService.yearlyData({
            selected,
            timeFilter,
            moneyFilter,
            from,
            to,
            results
          });
        default:
          return { categories: [], datasets: [] };
      }
    } catch (error) {
      console.log(error);
      return { categories: [], datasets: [] };
    }
  };
  render() {
    const { classes, barras, costos, fetchCostosMarginalesReales } = this.props;
    const { items } = barras;
    const { marginalReal } = costos;
    const {
      selected,
      timeFilter,
      moneyFilter,
      from,
      to,
      results,
      loader
    } = marginalReal;

    const data = this.formatData({
      selected,
      timeFilter,
      moneyFilter,
      from,
      to,
      results
    });
    const { loading } = loader;
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
            <div className={classes.wrapper}>
              <Button
                color="primary"
                variant="extendedFab"
                fullWidth
                disabled={loading}
                className={classes.button}
                onClick={fetchCostosMarginalesReales}
              >
                Actualizar
              </Button>
              {loading && (
                <CircularProgress
                  size={36}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <Line
              loader={loader}
              data={data}
              title={`CMg ( ${moneyFilter.toUpperCase()}/MWh )`}
              suffix={` ( ${moneyFilter.toUpperCase()}/MWh )`}
            />
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
