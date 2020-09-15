import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

import { setSnackbar } from './snackbarSlice'

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const GlobalSnackbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const open = useSelector((state) => state.snackbar.open)
  const type = useSelector((state) => state.snackbar.type)
  const message = useSelector((state) => state.snackbar.message)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setSnackbar(false, type, message))
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default GlobalSnackbar
