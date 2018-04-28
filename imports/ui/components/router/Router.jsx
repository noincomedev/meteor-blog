import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const h1 = () => <h1>Hello, router!</h1>;

export default (Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={h1} />
    </Switch>
  </BrowserRouter>
));
