import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Startpage from '../Startpage'
import Help from '../../components/Help'
import Game from '../../containers/Game'
import Lobby from '../Lobby/Lobby'
import Presentation from '../Presentation/Presentation'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Startpage} />
        <Route path="/help" component={Help} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/game" component={Game} />
        <Route path="/presentation" component={Presentation} />
      </Switch>
    )
  }
}

export default App
