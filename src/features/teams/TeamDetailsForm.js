import React from 'react'
import TextField from '@material-ui/core/TextField'

const TeamDetailsForm = ({
  name,
  description,
  handleNameChange,
  handleDescriptionChange,
}) => {
  return (
    <React.Fragment>
      <TextField
        autoFocus
        required
        id="team-name-input"
        label="Name"
        placeholder="Give your team a name"
        margin="normal"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        required
        id="team-description-input"
        label="Description"
        value={description}
        placeholder="Let people know what the team is about"
        variant="filled"
        margin="normal"
        fullWidth
        multiline
        rows={4}
        onChange={handleDescriptionChange}
      />
    </React.Fragment>
  )
}

export default TeamDetailsForm
