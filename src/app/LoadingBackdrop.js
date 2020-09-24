import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const LoadingBackdrop = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default LoadingBackdrop
