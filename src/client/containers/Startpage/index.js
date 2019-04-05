import React, { Component } from 'react'
import './Startpage.css'
import Navbar from '../../components/Navbar'
import AppButtons from '../../components/AppButtons'

class Startpage extends Component {
  render() {
    return (
      <div>
        <div className="startpage">
          <Navbar />
          <h1>Welcome to Rock, Paper, Scissors!</h1>
          <p>This game was created by Robin!!</p>
          <AppButtons
            value="Click me to play!"
            onClick={() => this.props.history.push('/game')}
          />
        </div>
        <span className="start-background" />
      </div>
    )
  }
}
export default Startpage
