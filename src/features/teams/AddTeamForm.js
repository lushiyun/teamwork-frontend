import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core'

import { teamAdded } from './teamsSlice'
import TeamDetailsForm from './TeamDetailsForm'
import TeamCoverForm from './TeamCoverForm'
import TeamMembersForm from './TeamMembersForm'

const stepTitles = ['Some quick details', 'Select a cover', 'Add team members']

const AddTeamForm = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cover, setCover] = useState('')
  const [members, setMembers] = useState([])

  const dispatch = useDispatch()

  const isLastStep = activeStep === stepTitles.length - 1

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleNameChange = (e) => setName(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleCoverChange = (url) => setCover(url)

  const activeForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <TeamDetailsForm
            name={name}
            description={description}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
          />
        )
      case 1:
        return <TeamCoverForm cover={cover} handleCoverChange={handleCoverChange} />
      case 2:
        return <TeamMembersForm members={members} setMembers={setMembers} />
    }
  }

  const handleFormSubmit = () => {
    if (name && description && cover) {
      dispatch(
        teamAdded({
          id: nanoid(),
          name,
          description,
          cover,
        })
      )
    }
    setName('')
    setDescription('')
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create your team</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {stepTitles.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeForm()}
      </DialogContent>
      <DialogActions
        style={{ paddingRight: '1.5rem', paddingBottom: '1.5rem' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={isLastStep ? handleFormSubmit : handleNext}>
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTeamForm
