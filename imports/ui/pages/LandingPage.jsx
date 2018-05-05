import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default (LandingPage = () => (
  <Fragment>
    <h1>Live on @zeithq #nowsh!</h1>
    <div>
      <Link to="/signin">Signin</Link>
    </div>
    <Link to="/signup">Singup</Link>
  </Fragment>
));
