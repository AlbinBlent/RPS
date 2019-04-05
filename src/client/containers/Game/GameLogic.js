const GameLogic = (playerMove, secPlayerMove) => {
  const gameRules = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock',
  }

  if (playerMove === secPlayerMove) {
    return 'Tie!'
  }
  if (secPlayerMove === gameRules[playerMove]) {
    return 'Winner, winner, chicken dinner!'
  } else {
    return 'Lost, try again!'
  }
}
export default GameLogic
