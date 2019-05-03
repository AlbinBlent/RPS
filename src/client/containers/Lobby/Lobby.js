import React from 'react'
import './Lobby.css'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MoveButtons from '../../components/MoveButtons'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
})

const Lobby = ({
  classes,
  createGame,
  joinGame,
  change,
  creatorName,
  joinerName,
  roomId,
}) => {
  return (
    <div>
      <div className="game-lobby">
        <div className="lobby-new-game">
          <h2>Create a new game:</h2>
          <form
            onSubmit={createGame}
            className={classes.container}
            noValidate
            autoComplete="off"
            id="create-game"
          >
            <TextField
              label={'Player name'}
              className={classes.textField}
              value={creatorName}
              onChange={change('creatorName')}
              margin="normal"
              variant="outlined"
            />
          </form>
          <MoveButtons onClick={createGame} value="Submit" size="small" />
        </div>
        <div className="lobby-join-game">
          <h2>Join game:</h2>
          <form
            onSubmit={joinGame}
            className={classes.container}
            noValidate
            autoComplete="off"
            id="join-game"
          >
            <TextField
              label="Player name"
              className={classes.textField}
              value={joinerName}
              onChange={change('joinerName')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              value={roomId}
              onChange={change('roomId')}
              label="Room id"
              margin="normal"
              variant="outlined"
            />
          </form>
          <MoveButtons onClick={joinGame} value="Submit" size="small" />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Lobby)
