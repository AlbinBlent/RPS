'use strict'
//Initiation and dependencies
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

//Server homepage
app.get('/', function(req, res) {
  res.status(200).send('nothing here..')
  res.sendFile(__dirname + '/index.html')
})

var rooms = 1
var players = []
var gameState = []

function Player(name, id, turn, move) {
  this.name = name
  this.move = move
  this.id = id
  this.turn = turn
}

//Looks for connections & creates a game.
io.on('connection', function(socket) {
  console.log(socket.id + ' user connected to lobby')
  socket.on('disconnect', function() {
    console.log(socket.id + ' user disconnected')
    socket.broadcast.emit('playerDisconnected', { id: socket.id })
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === socket.id) {
        players.splice(i, 1)
      }
    }
  })

  socket.on('createGame', function(data) {
    socket.join('room-' + rooms)
    players.push(new Player(data.name, data.id))
    socket.emit('messagePlayerOne', { p1: players[0] })
    // socket.broadcast.to('room-1').emit('hostPlayer', { p1: players[0] })
    console.log('New game created: ' + data.name + ' room-' + rooms)
  })

  socket.on('joinGame', function(data) {
    var room = io.nsps['/'].adapter.rooms[data.room]
    if (room && room.length === 1) {
      socket.join(data.room)
      //console.log(data.name + ' ' + data.id + '' + ' joined ' + data.room)
      players.push(new Player(data.name, data.id, data.turn))
      socket.broadcast.to(data.room).emit('newPlayer', { p2: players[1] })
      socket.emit('messagePlayerTwo', { p2: players[1] })
    } else {
      socket.emit('err', { message: 'Room is full!' })
    }
  })
})

//Start server
http.listen(3001, function() {
  console.log('listening on *:3001')
})

// socket.on('playTurn', function(data) {
//     // } else {
//     //   gameState.playerTwo = data.move
//     //   gameState.playerTurn = true
//     //   socket.emit('playerTwoTurnPlayed', gameState)
//     //   gameState.result = GameLogic(gameState.playerOne, gameState.playerTwo)
//     //   switch (gameState.result) {
//     //     case 'Tie!':
//     //       io.in(data.room).emit('Tie', gameState.result)
//     //       break
//     //     default:
//     //       'No result'
//     //   }
//     // }
//     //io.in(data.room).emit('gameState', gameState)
//   })

//   // socket.emit('gameResult', result)
//   // gameState.result = GameLogic(gameState.playerOne, gameState.playerTwo)
//   // io.in(data.room).emit('result', gameState.result)

//   // socket.on('playTurn', function(data) {
//   //   if (gameState.playerOneTurn === true) {
//   //     gameState.playerOne = data.move
//   //     gameState.playerOneTurn = false
//   //     //socket.emit('playerOneTurnPlayed', gameState.playerTurn)
//   //   } else {
//   //     gameState.playerTwo = data.move
//   //     gameState.playerTwoTurn = false
//   //     //socket.broadcast.emit('playerTwoTurnPlayed', gameState.playerTurn)
//   //   }

//   //   //io.in(data.room).emit('gameState', gameState)

//   //   //console.log(gameState.playerOne)
//   //   // socket.broadcast.to(data.room).emit('playerOneTurnPlayed', {
//   //   //   move: data.move,
//   //   //   room: data.room,
//   //   // })
//   // })

//   // socket.on('playerTwoTurn', function(data) {
//   //   gameState.playerTurn = true
//   //   gameState.playerTwo = data.move
//   //   io.in(data.room).emit('playerTwoTurnPlayed', gameState.playerTwo)

//   //   gameState.result = GameLogic(gameState.playerOne, gameState.playerTwo)
//   //   io.in(data.room).emit('result', gameState.result)

//   //   console.log(gameState.playerOne)
//   //   console.log(gameState.playerTwo)
//   //   console.log(gameState.result)
//   //   // socket.broadcast.to(data.room).emit('playerTwoTurnPlayed', {
//   //   //   move: data.move,
//   //   //   room: data.room,
//   //   // })
//   // })

//   // socket.on('gameResult', function(data) {
//   //   socket.broadcast.to(data.room).emit('result', data)
//   // })
// })

// const GameLogic = (playerOneTurn, playerTwoTurn) => {
//   const gameRules = {
//     rock: 'scissors',
//     scissors: 'paper',
//     paper: 'rock',
//   }

//   if (playerOneTurn === playerTwoTurn) {
//     return 'Tie!'
//   }
//   if (playerTwoTurn === gameRules[playerOneTurn]) {
//     return 'Winner, winner, chicken dinner!'
//   } else {
//     return 'Lost, try again!'
//   }
// }
