// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import moment from "moment";

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
    const options = {
      responsive: true,
      tooltips: {
        mode: "label",
        callbacks: {
          title: function(tooltipItem, data) {
            return `${data["labels"][tooltipItem[0]["index"]]}`;
          },
          label: function(tooltipItem, data) {
            return `${
              data["datasets"][tooltipItem["datasetIndex"]]["label"]
            }: ${
              data["datasets"][tooltipItem["datasetIndex"]]["data"][
                tooltipItem["index"]
              ]
            } (USD/MWh)`;
          }
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: function(value, index, values) {
                const date = value.split(" ");
                const momentDate = moment(date[0]);
                if (date[1] === "01:00")
                  return `${momentDate.format("MMM DD")} - ${date[1]}`;
                return `${date[1]}`;
              }
            }
          }
        ]
      }
    };
    return (
      <div className={classes.root}>
        <div className={classes.graph}>
          <Line data={data} options={options} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Costos);
