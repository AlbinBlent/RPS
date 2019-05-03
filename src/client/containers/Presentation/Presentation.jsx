import React, { useState } from 'react'
import Lobby from '../Lobby/Lobby'
import Game from '../Game/index'
import io from 'socket.io-client'

var socket = io('http://localhost:3001/')

const Presentation = () => {
  //Lobby
  const [state, setState] = useState({
    creatorName: '',
    joinerName: '',
    roomId: '',
  })
  const [message, setMessage] = useState('')
  const [gameCreated, setGameCreated] = useState(false)
  const [joinedGame, setJoinedGame] = useState(false)

  //Game
  const [playerNames, setPlayerNames] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(null)
  const [playerMove, setPlayerMove] = useState(null)
  const [gameResult, setGameResult] = useState(null)
  const [playerOneWins, setPlayerOneWins] = useState(0)
  const [playerTwoWins, setPlayerTwoWins] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  //Events
  const createGame = e => {
    e.preventDefault()
    socket.emit('createGame', {
      name: state.creatorName,
      move: null,
      id: socket.id,
      turn: true,
    })
  }

  const joinGame = () => {
    socket.emit('joinGame', {
      name: state.joinerName,
      room: state.roomId,
      id: socket.id,
      turn: false,
    })
    socket.on('err', function(data) {
      alert(data.message)
    })
    setJoinedGame(true)
    setGameStarted(true)
  }

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
    console.log(state)
  }

  const moveFromGame = move => {
    socket.emit('playTurn', move)
    setGameStarted(true)
  }
  //Server events
  socket.on('gameCreated', resp => {
    setMessage(
      `Welcome, ${resp.name}! Give this id to your opponent: room-${resp.room}`,
    )
    setGameCreated(true)
  })
  socket.on('joinGame', resp => {
    setMessage(`Welcome, ${resp.name}! You are in room-${resp.room}`)
  })

  socket.on('playerOneData', resp => {
    setPlayerNames(resp.p1.name)
    setPlayerTurn(resp.p1.turn)
    console.log(resp)
  })

  socket.on('playerTwoData', resp => {
    setPlayerNames(resp.p2.name)
    setPlayerTurn(resp.p2.turn)
  })

  socket.on('playerDisconnected', resp => {
    console.log(`User with id: ${resp.id} disconnected..`)
  })

  socket.on('playerOneTurn', resp => {
    setPlayerTurn(resp.p1.turn)
  })
  socket.on('playerTwoTurn', resp => {
    setPlayerTurn(resp.p2.turn)
  })

  socket.on('gameEnd', resp => {
    setPlayerOneWins(resp.p[0].wins)
    setPlayerTwoWins(resp.p[1].wins)
    setGameResult(resp.r)
    if (playerTurn) {
      setPlayerMove(resp.p[1].move)
    } else {
      setPlayerMove(resp.p[0].move)
    }
    setTimeout(() => {
      setPlayerMove(null)
      setGameResult('Next round.. fight!')
      setGameStarted(false)
    }, 2500)
  })

  return (
    <>
      {message}
      {gameCreated || joinedGame ? (
        <Game
          playerNames={playerNames}
          playerTurn={playerTurn}
          moveFromGame={moveFromGame}
          playerMove={playerMove}
          gameStarted={gameStarted}
          gameResult={gameResult}
          playerOneWins={playerOneWins}
          playerTwoWins={playerTwoWins}
        />
      ) : (
        <Lobby
          createGame={createGame}
          joinGame={joinGame}
          change={handleChange}
          creatorName={state.creatorName}
          joinerName={state.joinerName}
          roomId={state.roomId}
        />
      )}
    </>
  )
}

export default Presentation
