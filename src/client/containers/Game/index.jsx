import React, { useState } from 'react'
import './Game.css'
import MoveButtons from '../../components/MoveButtons/index'
import GameLogic from './GameLogic'
//import RandomCpu from './CpuMove'
import io from 'socket.io-client'

const rock = require('../../../assets/sten.png')
const paper = require('../../../assets/papper.png')
const scissors = require('../../../assets/sax.png')
const p1 = require('../../../assets/p1.png')
const p2 = require('../../../assets/p2.png')

//Server
var socket = io('http://localhost:3001/', { forceNew: true })

const Game = () => {
  const createGame = () => {
    socket.emit('createGame', { name: 'robin', id: socket.id })
  }

  socket.on('messagePlayerOne', resp => {
    setPlayers(resp.p1.name)
  })

  socket.on('messagePlayerTwo', resp => {
    setPlayers(resp.p2.name)
  })

  const joinGame = () => {
    socket.emit('joinGame', {
      name: 'albin',
      room: 'room-1',
      id: socket.id,
      turn: true,
    })
    socket.on('err', function(data) {
      alert(data.message)
    })
  }

  //Add UI message element to display room info for other player.
  socket.on('newPlayer', resp => {
    setMessage(resp.p2.name)
    setPlayerTurn(resp.p2.turn)
    console.log(
      `A new player: ${resp.p2.name} joined ${resp.p2.room} with id: ${
        resp.p2.id
      }`,
    )
  })
  socket.on('playerDisconnected', resp => {
    console.log(`User with id: ${resp.id} disconnected..`)
  })

  //States
  const [gameAlternatives] = useState([
    { value: 'Rock', move: 'rock', img: rock },
    { value: 'Paper', move: 'paper', img: paper },
    { value: 'Scissors', move: 'scissors', img: scissors },
  ])
  ///MP
  const [players, setPlayers] = useState()
  const [message, setMessage] = useState()
  /// SP
  const [playerOne, setPlayerOne] = useState()
  const [imgPlayerOne, setImgPlayerOne] = useState()
  const [playerTwo, setPlayerTwo] = useState('')
  const [imgPlayerTwo, setImgPlayerTwo] = useState()
  const [gameStarted, setGameStarted] = useState(false)
  const [playerTurn, setPlayerTurn] = useState()
  const [gameState, setGameState] = useState()
  // const [result, setResult] = useState(false)
  // const [wins, setWins] = useState(0)
  // const [lost, setLost] = useState(0)
  // const [draw, setDraw] = useState(0)

  // const handleResult = (playerMove, secPlayerMove) => {
  const handleResult = () => {
    const p1state = playerOne
    const p2state = playerTwo
    //Render secPlayer move:
    //setImgPlayerTwo(secPlayerMove)
    //Set gamestate of result
    const result = GameLogic(p1state, p2state)
    socket.emit('gameResult', result)
    // setGameState(result)

    // switch (result) {
    //   case 'Winner, winner, chicken dinner!':
    //     setWins(wins + 1)
    //     break
    //   case 'Lost, try again!':
    //     setLost(lost + 1)
    //     break
    //   case 'Tie!':
    //     setDraw(draw + 1)
    //     break
    //   default:
    // }
  }

  return (
    <div className="game">
      <button onClick={joinGame}>JOIN GAME</button>
      <button onClick={createGame}>CREATE GAME</button>
      <h2 className="game-state">{gameState} </h2>
      <h1>
        {players === undefined
          ? 'Welcome - Waiting for opponent..'
          : `Welcome ${players}!`}
      </h1>
      <h4> {playerTurn ? 'Your turn..' : 'Opponents turn'} </h4>
      {/* <h4>Your are playing against: {message}</h4> */}
      {/* <div>Player 1: {playerOne} </div>
      <div>Player 2: {playerTwo}</div> */}
      <div className="render-img">
        <div className="player-image">
          {gameStarted ? (
            <img className="player" src={imgPlayerOne} alt="lol" />
          ) : (
            <img className="p1" src={p1} alt="lol" />
          )}
        </div>
        <div className="secondplayer-image">
          {gameStarted ? (
            <img className="secplayer" src={imgPlayerTwo} alt="lol" />
          ) : (
            <img className="p2" src={p2} alt="lol" />
          )}
          {/* {gameStarted || <img className="p2" src={p2} alt="lol" />}
          {imgPlayerTwo === 'rock' && (
            <img className="secplayer " src={rock} alt="lol" />
          )}
          {imgPlayerTwo === 'paper' && (
            <img className="secplayer " src={paper} alt="lol" />
          )}
          {imgPlayerTwo === 'scissors' && (
            <img className="secplayer " src={scissors} alt="lol" />
          )} */}
        </div>
        <div className="game-alternatives">
          {gameAlternatives.map((gameAlternative, index) => {
            return (
              <MoveButtons
                key={index}
                value={gameAlternative.value}
                className="move-button"
                onClick={() => {
                  // playerTurn
                  //   ? _playTurn(gameAlternative.move)
                  //   : console.log('Not your turn..')
                  //setGameStarted(true) //Emit gamestart to server?
                  // playerTurn
                  //   ? _player(gameAlternative.move)
                  //   : _playerTwo(gameAlternative.move)
                  // playerTurn
                  //   ? setImgPlayerOne(gameAlternative.img)
                  //   : setImgPlayerTwo(gameAlternative.img)
                  //handleResult(gameAlternative.move, RandomCpu())
                  //setImgPlayerOne(gameAlternative.img)
                }}
              />
            )
          })}
        </div>
      </div>
      <h3 className="result-counter">
        <ul>{/* Wins: {wins} Lost: {lost} Ties: {draw} */}</ul>
      </h3>
      <span className="game-background" />
    </div>
  )
}

export default Game
