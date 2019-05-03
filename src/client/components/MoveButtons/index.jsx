import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '200px',
  },
  input: {
    display: 'none',
  },
})

const MoveButtons = props => {
  const { classes } = props
  return (
    <Button
      variant="contained"
      color="secondary"
      size={props.size}
      width={props.width}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  )
}

export default withStyles(styles)(MoveButtons)
