import React, { Component } from "react";
import "./Game.css";
import Navbar from "../../components/Navbar";
import AppButtons from "../../components/AppButtons";

class Game extends Component {
  renderGameMoveButtons(buttons) {
    return <AppButtons value={buttons} />;
  }
  render() {
    return (
      <div>
        <div className="game">
          Make your move:
          <div className="buttons">
            {this.renderGameMoveButtons("Rock")}
            {this.renderGameMoveButtons("Paper")}
            {this.renderGameMoveButtons("Scissor")}
          </div>
          <Navbar />
        </div>
        <span className="game-background" />
      </div>
    );
  }
}
export default Game;
