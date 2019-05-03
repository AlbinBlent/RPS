// import React from 'react'
// import './Lobby.css'
// import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   dense: {
//     marginTop: 16,
//   },
//   menu: {
//     width: 200,
//   },
// })

// const LobbyForm = props => {
//   const { classes } = props
//   return (
//     <div>
//       <div className="game-lobby">
//         <div className="lobby-new-game">
//           <h2>Create a new game:</h2>
//           <form
//             onSubmit={props.createGame}
//             className={classes.container}
//             noValidate
//             autoComplete="off"
//             id="create-game"
//           >
//             <TextField
//               label={'Player name'}
//               className={classes.textField}
//               value={props.creatorName}
//               margin="normal"
//               variant="outlined"
//               onChange={props => e => props[e.target.value]}
//             />
//           </form>
//           <input type="submit" form="create-game" value="Submit" size="small" />
//         </div>

//         <div className="lobby-join-game">
//           <h2>Join game:</h2>
//           <form
//             onSubmit={props.joinGame}
//             className={classes.container}
//             noValidate
//             autoComplete="off"
//             id="join-game"
//           >
//             <TextField
//               label="Player name"
//               className={classes.textField}
//               value={props.joinerName}
//               margin="normal"
//               variant="outlined"
//               onChange={props => e => props[e.target.value]}
//             />
//             <TextField
//               className={classes.textField}
//               value={props.roomId}
//               label="Room id"
//               margin="normal"
//               variant="outlined"
//               onChange={props => e => props[e.target.value]}
//             />
//           </form>
//           <input type="submit" form="join-game" value="Submit" size="small" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default withStyles(styles)(LobbyForm)
