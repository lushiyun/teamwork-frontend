import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const TeamTabs = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => setValue(newValue)

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Messages" />
        <Tab label="Todos" />
      </Tabs>
    </Paper>
  )
}

export default TeamTabs
