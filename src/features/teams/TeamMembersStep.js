import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'

import {
  Avatar,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    width: theme.spacing(14),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

const TeamMembersStep = ({ members, handleMemberChange }) => {
  const classes = useStyles()
  const allUsers = useSelector(selectAllUsers)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const searchedUsers = query
      ? allUsers.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      : allUsers
    setResults(searchedUsers)
  }, [query])

  const renderedUsers = () =>
    results.map((user) => (
      <Grid item key={user.id} className={classes.gridItem}>
        <FormControlLabel
          control={
            <Checkbox
              checked={members.includes(user.id)}
              onChange={() => handleMemberChange(user.id)}
              name={user.id}
              color="primary"
            />
          }
          label={
            <div>
              <Avatar
                src={user.picture_url}
                alt={user.name}
                className={classes.large}
              />
              <Typography variant="caption">{user.name}</Typography>
            </div>
          }
          labelPlacement="top"
        />
      </Grid>
    ))

  return (
    <React.Fragment>
      <TextField
        autoFocus
        id="search-query-input"
        label="Search all users"
        placeholder="Select users for your team or search by their names"
        margin="normal"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Grid container spacing={2} className={classes.gridContainer}>
        {renderedUsers()}
      </Grid>
    </React.Fragment>
  )
}

export default TeamMembersStep
