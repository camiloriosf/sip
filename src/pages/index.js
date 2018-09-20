// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

const styles = (theme: Object) => ({
  root: {}
});

type Props = {
  classes: Object
};

class Index extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>asd</div>;
  }
}

export default withRoot(withStyles(styles)(Index));
