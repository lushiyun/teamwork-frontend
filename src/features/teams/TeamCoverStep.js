import React, { useState, useEffect } from 'react'
import {
  TextField,
  GridList,
  GridListTile,
  ButtonBase,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import unsplash from '../../api/unsplash'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0,
      },
    },
  },
  focusVisible: {},
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
}))

const TeamCoverStep = ({ cover, handleCoverChange }) => {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [initialImgs, setInitialImgs] = useState([])

  useEffect(() => {
    const search = async () => {
      const { data } = await unsplash.get('search/photos', {
        params: { query: query },
      })
      setResults(data.results)
    }
    const timeoutId = setTimeout(() => {
      if (query) {
        search()
      }
    }, 500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [query])

  useEffect(() => {
    const search = async () => {
      const { data } = await unsplash.get('search/photos', {
        params: { query: 'teamwork' },
      })
      setInitialImgs(data.results)
    }
    search()
  }, [])

  const renderedImgList = () => {
    const data = results.length === 0 ? initialImgs : results
    return data.map((img) => (
      <GridListTile key={img.id}>
        <ButtonBase
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => {
            handleCoverChange(img.urls.regular)
          }}>
          <span
            className={classes.imageSrc}
            style={{ backgroundImage: `url(${img.urls.regular})` }}
          />
          {cover !== img.urls.regular && (
            <span className={classes.imageBackdrop} />
          )}
        </ButtonBase>
      </GridListTile>
    ))
  }

  return (
    <React.Fragment>
      <TextField
        autoFocus
        id="search-query-input"
        label="Search on Unsplash"
        placeholder="Pick an image or search for your own"
        margin="normal"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <GridList cellHeight={150} cols={3} className={classes.gridList}>
        {renderedImgList()}
      </GridList>
    </React.Fragment>
  )
}

export default TeamCoverStep
