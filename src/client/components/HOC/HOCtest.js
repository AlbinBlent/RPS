// import React, { Component } from 'react'
// import Lobby from '../../containers/Lobby/Lobby'

// const HOCTest = WrappedComponent => {
//   return class HOCTest extends Component {
//     render() {
//       return <WrappedComponent />
//     }
//   }
// }
// export default HOCTest

// import React, { useState, useEffect } from 'react'
// import './Game.css'
// import MoveButtons from '../../components/MoveButtons/index'
// import Loader from './Loader'
// import io from 'socket.io-client'

// const rock = require('../../../assets/sten.png')
// const paper = require('../../../assets/papper.png')
// const scissors = require('../../../assets/sax.png')
// const p1 = require('../../../assets/p1.png')
// const p2 = require('../../../assets/p2.png')

// //Server
// var socket = io('http://localhost:3001/', {
//   reconnect: false,
// })

// const Game = ({
//   playerNames,
//   playerTurn,
//   playerMove,
//   gameResult,
//   playerOneWins,
//   playerTwoWins,
// }) => {
//   //States
//   const [gameAlternatives] = useState([
//     { value: 'Rock', move: 'rock', img: rock },
//     { value: 'Paper', move: 'paper', img: paper },
//     { value: 'Scissors', move: 'scissors', img: scissors },
//   ])

//   //MP
//   // const [playerNames, setPlayerNames] = useState(null)
//   // const [playerTurn, setPlayerTurn] = useState(null)
//   // const [playerMove, setPlayerMove] = useState(null)
//   // const [gameResult, setGameResult] = useState(null)
//   // const [playerOneWins, setPlayerOneWins] = useState(0)
//   // const [playerTwoWins, setPlayerTwoWins] = useState(0)

//   // /// SP (Fix later)
//   const [imgPlayerOne, setImgPlayerOne] = useState(null)
//   const [gameStarted, setGameStarted] = useState(false)

//   // const createGame = () => {
//   //   socket.emit('createGame', {
//   //     name: creatorName,
//   //     move: null,
//   //     id: socket.id,
//   //     turn: true,
//   //   })
//   // }

//   // const joinGame = () => {
//   //   socket.emit('joinGame', {
//   //     name: joinerName,
//   //     room: roomId,
//   //     id: socket.id,
//   //     turn: false,
//   //   })
//   //   socket.on('err', function(data) {
//   //     alert(data.message)
//   //   })
//   // }

//   const _playTurn = move => {
//     socket.emit('playTurn', move)
//     setGameStarted(true)
//   }

//   // socket.on('playerOneData', resp => {
//   //   setPlayerNames(resp.p1.name)
//   //   setPlayerTurn(resp.p1.turn)
//   //   console.log(resp)
//   // })

//   // socket.on('playerTwoData', resp => {
//   //   setPlayerNames(resp.p2.name)
//   //   setPlayerTurn(resp.p2.turn)
//   // })

//   // socket.on('playerDisconnected', resp => {
//   //   console.log(`User with id: ${resp.id} disconnected..`)
//   // })

//   // socket.on('playerOneTurn', resp => {
//   //   setPlayerTurn(resp.p1.turn)
//   // })
//   // socket.on('playerTwoTurn', resp => {
//   //   setPlayerTurn(resp.p2.turn)
//   // })

//   // socket.on('gameEnd', resp => {
//   //   setPlayerOneWins(resp.p[0].wins)
//   //   setPlayerTwoWins(resp.p[1].wins)
//   //   setGameResult(resp.r)
//   //   if (playerTurn) {
//   //     setPlayerMove(resp.p[1].move)
//   //   } else {
//   //     setPlayerMove(resp.p[0].move)
//   //   }
//   //   setTimeout(() => {
//   //     setPlayerMove(null)
//   //     setGameResult('Next round.. fight!')
//   //     setGameStarted(false)
//   //   }, 2500)
//   // })

//   //I want creatorName from Lobby
//   const myCallback = creatorName => {
//     alert(creatorName)
//   }

//   //console.log(creatorName)

//   return (
//     <div className="game-scene">
//       {/* <Presentation getState={myCallback} /> */}
//       {/* <button onClick={joinGame}>JOIN GAME</button>
//       <button onClick={createGame}>CREATE GAME</button> */}

//       <div className="game-messaging">
//         <h3>
//           {playerNames === null ? (
//             <Loader text="Waiting for opponent.." />
//           ) : (
//             `Welcome ${playerNames}!`
//           )}
//         </h3>

//         <div className="game-state">
//           <h1>{gameResult}</h1>
//         </div>

//         <div className="game-turn">
//           {playerTurn === null ? (
//             <></>
//           ) : (
//             <h3>
//               {playerTurn ? 'Your turn..' : <Loader text="Opponents turn.." />}
//             </h3>
//           )}
//         </div>
//       </div>
//       <div className="game">
//         <div className="render-img">
//           <div className="player-image">
//             {gameStarted ? (
//               <img className="player" src={imgPlayerOne} alt="lol" />
//             ) : (
//               <img className="p1" src={p1} alt="lol" />
//             )}
//           </div>
//           <div className="secondplayer-image">
//             {gameStarted || <img className="p2" src={p2} alt="lol" />}
//             {playerMove === 'rock' && (
//               <img className="secplayer" src={rock} alt="lol" />
//             )}
//             {playerMove === 'paper' && (
//               <img className="secplayer" src={paper} alt="lol" />
//             )}
//             {playerMove === 'scissors' && (
//               <img className="secplayer" src={scissors} alt="lol" />
//             )}
//           </div>
//         </div>
//         <div className="game-counters">
//           <h5>Wins: {playerOneWins}</h5>
//           <h5>Wins: {playerTwoWins}</h5>
//         </div>
//         <div className="game-alternatives">
//           {gameAlternatives.map((gameAlternative, index) => {
//             return (
//               <MoveButtons
//                 key={index}
//                 value={gameAlternative.value}
//                 className="move-button"
//                 onClick={() => {
//                   playerTurn
//                     ? _playTurn(gameAlternative.move)
//                     : alert('Not your turn..')
//                   playerTurn && setImgPlayerOne(gameAlternative.img)
//                 }}
//               />
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Game
