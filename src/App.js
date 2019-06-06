import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppContainer from "./containers";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AppContainer} />
      </Switch>
    </Router>
  );
}

export default App;
