import React, { useState } from 'react'
import './Game.css'
import MoveButtons from '../../components/MoveButtons/index'
import Loader from './Loader'

const rock = require('../../../assets/sten.png')
const paper = require('../../../assets/papper.png')
const scissors = require('../../../assets/sax.png')
const p1 = require('../../../assets/p1.png')
const p2 = require('../../../assets/p2.png')

const Game = ({
  playerNames,
  playerTurn,
  moveFromGame,
  playerMove,
  gameStarted,
  gameResult,
  playerOneWins,
  playerTwoWins,
}) => {
  //States
  const [gameAlternatives] = useState([
    { value: 'Rock', move: 'rock', img: rock },
    { value: 'Paper', move: 'paper', img: paper },
    { value: 'Scissors', move: 'scissors', img: scissors },
  ])

  const [imgPlayerOne, setImgPlayerOne] = useState(null)

  // // @js-ignore
  // const callBackFromParent = move => {
  //   moveFromGame(move)
  // }

  return (
    <div className="game-scene">
      <div className="game-messaging">
        <h3>
          {playerNames === null ? (
            <Loader text="Waiting for opponent.." />
          ) : (
            `Welcome ${playerNames}!`
          )}
        </h3>

        <div className="game-state">
          <h1>{gameResult}</h1>
        </div>

        <div className="game-turn">
          {playerTurn === null ? (
            <></>
          ) : (
            <h3>
              {playerTurn ? 'Your turn..' : <Loader text="Opponents turn.." />}
            </h3>
          )}
        </div>
      </div>
      <div className="game">
        <div className="render-img">
          <div className="player-image">
            {gameStarted ? (
              <img className="player" src={imgPlayerOne} alt="lol" />
            ) : (
              <img className="p1" src={p1} alt="lol" />
            )}
          </div>
          <div className="secondplayer-image">
            {gameStarted || <img className="p2" src={p2} alt="lol" />}
            {playerMove === 'rock' && (
              <img className="secplayer" src={rock} alt="lol" />
            )}
            {playerMove === 'paper' && (
              <img className="secplayer" src={paper} alt="lol" />
            )}
            {playerMove === 'scissors' && (
              <img className="secplayer" src={scissors} alt="lol" />
            )}
          </div>
        </div>
        <div className="game-counters">
          <h5>Wins: {playerOneWins}</h5>
          <h5>Wins: {playerTwoWins}</h5>
        </div>
        <div className="game-alternatives">
          {gameAlternatives.map((gameAlternative, index) => {
            return (
              <MoveButtons
                key={index}
                value={gameAlternative.value}
                className="move-button"
                onClick={() => {
                  playerTurn
                    ? moveFromGame(gameAlternative.move) //callBackFromParent(gameAlternative.move)
                    : alert('Not your turn..')
                  playerTurn && setImgPlayerOne(gameAlternative.img)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Game
