import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "../../pages/LandingPage";

export default (Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
));
