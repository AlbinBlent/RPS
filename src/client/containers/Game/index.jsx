import React, { Component } from "react";
import "./Game.css";
import MoveButtons from "../../components/MoveButtons";

/*
const rock = require("../../../assets/rock.png");
const paper = require("../../../assets/paper.png");
const scissors = require("../../../assets/scissors.png");
*/

const initialState = {
  currentGameState: "Welcome, make a move!",
  gameAlternatives: [
    { value: "Rock", name: "rock" },
    { value: "Paper", name: "paper" },
    { value: "Scissors", name: "scissors" }
  ]
};

//Random CPU move
const randomCpuMove = () => {
  const moveList = ["rock", "paper", "scissors"];
  return moveList[Math.floor(Math.random() * moveList.length)];
};

//Get winner from player and cpu choice
const getWinner = (playerChoice, computerChoice) => {
  const gameRules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock"
  };

  if (playerChoice === computerChoice) {
    return "draw";
  }
  if (computerChoice === gameRules[playerChoice]) {
    return "win";
  } else {
    return "lost";
  }
};

class Game extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onMoveSelection = move => {
    const result = getWinner(move, randomCpuMove());
    switch (result) {
      case "win":
        this.setState({ currentGameState: "You are victorious!" });
        break;
      case "lost":
        this.setState({ currentGameState: "Lost! - Please try again." });
        break;
      case "draw":
        this.setState({ currentGameState: "Draw! - Give it another go." });
        break;
      default:
    }
  };

  render() {
    const { gameAlternatives, currentGameState } = this.state;
    return (
      <div>
        <div className="game">
          <h1>{currentGameState}</h1>
          {gameAlternatives.map(gameAlternative => {
            return (
              <MoveButtons
                className="move-button"
                onClick={() => {
                  this.onMoveSelection(gameAlternative.name);
                }}
                value={gameAlternative.value}
                alt={gameAlternative.value}
              />
            );
          })}
        </div>
        <span className="game-background" />
      </div>
    );
  }
}

export default Game;
