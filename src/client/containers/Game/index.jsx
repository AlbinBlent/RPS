import React, { useState } from 'react'
import './Game.css'
import MoveButtons from '../../components/MoveButtons/index'
import GameLogic from './GameLogic'
import RandomCpu from './CpuMove'

const rock = require('../../../assets/sten.png')
const paper = require('../../../assets/papper.png')
const scissors = require('../../../assets/sax.png')
const p1 = require('../../../assets/p1.png')
const p2 = require('../../../assets/p2.png')

const Game = () => {
  const [gameAlternatives] = useState([
    { value: 'Rock', move: 'rock', img: rock },
    { value: 'Paper', move: 'paper', img: paper },
    { value: 'Scissors', move: 'scissors', img: scissors },
  ])

  const [playerImage, setPlayerImage] = useState()
  const [secPlayerImage, setSecPlayerImage] = useState()
  const [gameStarted, setGameStarted] = useState(false)
  const [gameState, setGameState] = useState('Welcome, make a move!')

  const [wins, setWins] = useState(0)
  const [lost, setLost] = useState(0)
  const [draw, setDraw] = useState(0)

  const handleResult = (playerMove, secPlayerMove) => {
    //Render secPlayer move:
    setSecPlayerImage(secPlayerMove)
    //Set gamestate of result
    const result = GameLogic(playerMove, secPlayerMove)
    setGameState(result)

    switch (result) {
      case 'Winner, winner, chicken dinner!':
        setWins(wins + 1)
        break
      case 'Lost, try again!':
        setLost(lost + 1)
        break
      case 'Tie!':
        setDraw(draw + 1)
        break
      default:
    }

    //Debug
    console.log('p ' + playerMove)
    console.log('x ' + secPlayerMove)
    console.log('gs ' + result)
  }

  return (
    <div className="game">
      <h2 className="game-state">{gameState} </h2>
      <div className="render-img">
        <div className="player-image">
          {gameStarted ? (
            <img className="player" src={playerImage} alt="lol" />
          ) : (
            <img className="p1" src={p1} alt="lol" />
          )}
        </div>
        <div className="secondplayer-image">
          {gameStarted || <img className="p2" src={p2} alt="lol" />}
          {secPlayerImage === 'rock' && (
            <img className="secplayer " src={rock} alt="lol" />
          )}
          {secPlayerImage === 'paper' && (
            <img className="secplayer " src={paper} alt="lol" />
          )}
          {secPlayerImage === 'scissors' && (
            <img className="secplayer " src={scissors} alt="lol" />
          )}
        </div>
        <div className="game-alternatives">
          {gameAlternatives.map((gameAlternative, index) => {
            return (
              <MoveButtons
                key={index}
                value={gameAlternative.value}
                className="move-button"
                onClick={() => {
                  setGameStarted(true)
                  handleResult(gameAlternative.move, RandomCpu())
                  setPlayerImage(gameAlternative.img)
                }}
              />
            )
          })}
        </div>
      </div>
      <h3 className="result-counter">
        <ul>
          Wins: {wins} Lost: {lost} Ties: {draw}
        </ul>
      </h3>
      <span className="game-background" />
    </div>
  )
}

export default Game
