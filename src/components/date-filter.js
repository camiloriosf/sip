// @flow

import React from "react";
import PropTypes from "prop-types";
import "moment/locale/es";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import { DatePicker } from "material-ui-pickers";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

moment.locale("es");

const styles = theme => ({
  root: {
    display: "flex"
  },
  picker: {
    padding: theme.spacing.unit
  }
});

type Props = {
  from: string,
  to: string,
  handleDateChange: Function
};

class DateFilter extends React.Component<Props> {
  render() {
    const { classes, from, to, handleDateChange } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.root}>
          <DatePicker
            label="Desde"
            value={from}
            onChange={handleDateChange("from")}
            animateYearScrolling
            format="DD-MM-YYYY"
            className={classes.picker}
            leftArrowIcon={<KeyboardArrowLeftIcon />}
            rightArrowIcon={<KeyboardArrowRightIcon />}
            showTodayButton
            todayLabel="Hoy"
            autoOk
            disableFuture
            maxDate={to}
          />
          <DatePicker
            label="Hasta"
            value={to}
            onChange={handleDateChange("to")}
            animateYearScrolling
            format="DD-MM-YYYY"
            className={classes.picker}
            leftArrowIcon={<KeyboardArrowLeftIcon />}
            rightArrowIcon={<KeyboardArrowRightIcon />}
            showTodayButton
            todayLabel="Hoy"
            autoOk
            disableFuture
            minDate={from}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

DateFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateFilter);
