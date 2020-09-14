import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const TeamDetailsStep = ({
  name,
  description,
  handleNameChange,
  handleDescriptionChange,
}) => {
  const [nameError, setNameError] = useState(false)
  const [descError, setDescError] = useState(false)
  const [nameErrMsg, setNameErrMsg] = useState(null)
  const [descErrMsg, setDescErrMsg] = useState(null)

  const handleNameValidation = () => {
    if (name.length === 0) {
      setNameError(true)
      setNameErrMsg('Name is required')
    } else {
      setNameError(false)
      setNameError(null)
    }
  }

  const handleDescValidation = () => {
    if (description.length === 0) {
      setDescError(true)
      setDescErrMsg('Description is required')
    } else {
      setDescError(false)
      setDescError(null)
    }
  }

  return (
    <React.Fragment>
      <TextField
        autoComplete="false"
        error={nameError}
        helperText={nameErrMsg}
        autoFocus
        required
        id="team-name-input"
        label="Name"
        placeholder="Give your team a name"
        margin="normal"
        fullWidth
        value={name}
        onChange={(e) => {
          handleNameValidation()
          handleNameChange(e)
        }}
        onBlur={handleNameValidation}
      />
      <TextField
        autoComplete="false"
        error={descError}
        helperText={descErrMsg}
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
        onChange={(e) => {
          handleDescValidation()
          handleDescriptionChange(e)
        }}
        onBlur={handleDescValidation}
      />
    </React.Fragment>
  )
}

export default TeamDetailsStep
