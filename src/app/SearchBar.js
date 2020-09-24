import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fade, makeStyles } from '@material-ui/core/styles'
import { InputBase } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'

import { selectTeamsByUser } from '../features/teams/teamsSlice'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const SearchBar = () => {
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = useState(null)

  const currentUserId = useSelector((state) => state.users.currentUser)
  const userTeams = useSelector((state) =>
    selectTeamsByUser(state, currentUserId)
  )

  const handleChange = (e, newValue) => {
    history.push(`/teams/${newValue.id}`)
    setValue(newValue)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        value={value}
        onChange={(e, newValue) => {
          handleChange(e, newValue)
        }}
        options={userTeams}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <InputBase
              {...params.inputProps}
              placeholder="Search your teams..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default SearchBar
