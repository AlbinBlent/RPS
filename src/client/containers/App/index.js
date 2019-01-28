import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Startpage from "../Startpage";
import Help from "../../components/Help";
import Game from "../../containers/Game";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Startpage} />
        <Route path="/help" component={Help} />
        <Route path="/game" component={Game} />
      </Switch>
    );
  }
}

export default App;
