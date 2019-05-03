'use strict'

//Initiation and dependencies
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.status(200).send('nothing here..')
})

var rooms = 0
var players = []
var gameState = ''

function Player(name, move, id, turn, wins) {
  this.name = name
  this.move = move
  this.id = id
  this.turn = turn
  this.wins = wins
}

//Looks for connections
io.on('connection', function(socket) {
  console.log(socket.id + ' user connected to server')
  socket.on('disconnect', function() {
    console.log(socket.id + ' user disconnected')

    //Removes player from players array on disconnect
    socket.broadcast.emit('playerDisconnected', { id: socket.id })
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === socket.id) {
        players.splice(i, 1)
      }
    }
  })

  socket.on('createGame', function(data) {
    socket.join('room-' + ++rooms)
    console.log(data.name)
    players.push(new Player(data.name, data.move, data.id, data.turn))
    socket.emit('gameCreated', { name: data.name, room: rooms })
    socket.emit('playerOneData', { p1: players[0] })
    console.log(
      'New game created: ' + data.name + ' ' + data.id + ' ' + 'room-' + rooms,
    )
  })

  socket.on('joinGame', function(data) {
    var room = io.nsps['/'].adapter.rooms[data.room]
    if (room && room.length === 1) {
      socket.join(data.room)
      console.log(data.name + ' ' + data.id + '' + ' joined ' + data.room)
      socket.emit('joinGame', { name: data.name, room: rooms })
      players.push(new Player(data.name, data.move, data.id, data.turn))
      socket.emit('playerTwoData', { p2: players[1] })
    } else {
      socket.emit('err', { message: 'Room is full!' })
    }
  })

  socket.on('playTurn', function(data) {
    if (players[0].turn) {
      players[0].turn = false
      players[1].turn = true
      players[0].move = data
      console.log('P1: ' + players[0].move)
      socket.emit('playerOneTurn', { p1: players[0] })
      socket.broadcast.to('room-1').emit('playerTwoTurn', { p2: players[1] })
    } else {
      players[1].turn = false
      players[0].turn = true
      players[1].move = data
      console.log('P2: ' + players[1].move)
      socket.emit('playerTwoTurn', { p2: players[1] })
      socket.broadcast.to('room-1').emit('playerOneTurn', { p1: players[0] })
      gameState = GameLogic(players[0].move, players[1].move)
      io.in('room-1').emit('gameEnd', { p: players, r: gameState })
      console.log(players)
    }
  })

  const GameLogic = (playerOneTurn, playerTwoTurn) => {
    const gameRules = {
      rock: 'scissors',
      scissors: 'paper',
      paper: 'rock',
    }

    if (playerOneTurn === playerTwoTurn) {
      return 'Tie!'
    }
    if (playerTwoTurn === gameRules[playerOneTurn]) {
      players[0].wins = players[0].wins + 1 || 1
      return `${players[0].name} got the winner, winner, chicken dinner!`
    }
    if (playerOneTurn === gameRules[playerTwoTurn]) {
      players[1].wins = players[1].wins + 1 || 1
      return `${players[1].name} got the winner, winner, chicken dinner!`
    } else {
      return 'Lost, try again!'
    }
  }
})

//Start server
http.listen(3001, function() {
  console.log('listening on *:3001')
})
