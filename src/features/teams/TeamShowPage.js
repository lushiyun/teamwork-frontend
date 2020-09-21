import React from 'react'
import { useSelector } from 'react-redux'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CardMedia,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { selectUsersByTeam } from '../users/usersSlice'

const useStyles = makeStyles((theme) => ({
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}))

const TeamShowPage = ({ open, handleClose, team, handleJoin }) => {
  const classes = useStyles()
  const members = useSelector((state) => selectUsersByTeam(state, team.id))

  const renderedMembers =
    members &&
    members.map((member) => (
      <GridListTile key={member.id}>
        <img src={member.picture_url} alt={member.name} />
        <GridListTileBar title={member.name} />
      </GridListTile>
    ))

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{team.name}</DialogTitle>
      <CardMedia
        component="img"
        alt={team.name}
        height="250px"
        image={team.cover_url}
        title={team.name}
      />
      <DialogContent>
        <Typography gutterBottom variant="body1">
          {team.description}
        </Typography>
        <div className={classes.gridList}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">
                {members.length} members
              </ListSubheader>
            </GridListTile>
            {renderedMembers}
          </GridList>
        </div>
      </DialogContent>
      <DialogActions
        style={{ paddingRight: '1.5rem', paddingBottom: '1.5rem' }}>
        <Button onClick={handleClose}>close</Button>
        {!team.userIds.includes('45') && (
          <Button variant="contained" color="primary" onClick={handleJoin}>
            Join
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default TeamShowPage
