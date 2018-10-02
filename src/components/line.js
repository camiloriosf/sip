// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import ExportHighCharts from "highcharts/modules/exporting";
import ExportDataHighCharts from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";

ExportHighCharts(Highcharts);
ExportDataHighCharts(Highcharts);

const styles = (theme: Object) => ({
  root: {
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
  data: Object,
  title: string,
  suffix: string,
  loader: Object
};

type State = {};

class Costos extends React.Component<Props, State> {
  shouldComponentUpdate = props => {
    const { loader } = props;
    const { loading } = loader;
    return !loading;
  };

  render() {
    const { classes, data, title, suffix } = this.props;

    const options = {
      chart: {
        type: "spline",
        zoomType: "x",
        backgroundColor: "rgba(255, 255, 255, 0.0)"
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: data.categories
      },
      yAxis: {
        title: {
          text: title
        },
        labels: {
          formatter: function() {
            return this.value;
          }
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: suffix
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#666666",
            lineWidth: 1
          }
        }
      },
      series: data.datasets,
      exporting: {
        menuItemDefinitions: {
          downloadPNG: {
            text: "Descargar PNG"
          },
          downloadJPEG: {
            text: "Descargar JPEG"
          },
          downloadPDF: {
            text: "Descargar PDF"
          },
          downloadSVG: {
            text: "Descargar SVG"
          },
          downloadCSV: {
            text: "Descargar CSV"
          },
          downloadXLS: {
            text: "Descargar Excel"
          }
        },
        buttons: {
          contextButton: {
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "downloadPDF",
              "downloadSVG",
              "separator",
              "downloadCSV",
              "downloadXLS"
            ]
          }
        }
      }
    };

    return (
      <div className={classes.root}>
        <div className={classes.graph}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Costos);
