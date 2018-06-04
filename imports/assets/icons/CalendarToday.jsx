import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { PropTypes } from "prop-types";

const CalendarToday = ({ classes, color, size }) => (
  <SvgIcon
    color={color ? color : "inherit"}
    style={{
      maxHeight: size ? size : 16,
      maxWidth: size ? size : 16
    }}
  >
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </SvgIcon>
);

CalendarToday.propTypes = {
  size: PropTypes.number
};

export default CalendarToday;
