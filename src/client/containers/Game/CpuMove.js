const RandomCpu = () => {
  const moveList = ['rock', 'paper', 'scissors']
  return moveList[Math.floor(Math.random() * moveList.length)]
}

export default RandomCpu
