import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  svg: {
    maxHeight: theme.spacing.unit * 2,
    maxWidth: theme.spacing.unit * 2
  }
});

const CalendarToday = ({ classes, color }) => (
  <SvgIcon color={color} className={classes.svg}>
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </SvgIcon>
);

export default withStyles(styles, { withTheme: true })(CalendarToday);
