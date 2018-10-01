// @flow

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  }
});

class TimeFilter extends React.Component {
  render() {
    const { classes, value, handleChange } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Agrupar por</FormLabel>
          <RadioGroup
            aria-label="Group"
            name="group"
            className={classes.group}
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="hourly" control={<Radio />} label="Hora" />
            <FormControlLabel value="daily" control={<Radio />} label="Día" />
            <FormControlLabel value="monthly" control={<Radio />} label="Mes" />
            <FormControlLabel value="yearly" control={<Radio />} label="Año" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

TimeFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimeFilter);
