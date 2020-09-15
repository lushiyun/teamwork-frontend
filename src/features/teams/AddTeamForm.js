import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

import TeamDetailsStep from './TeamDetailsStep'
import TeamCoverStep from './TeamCoverStep'
import TeamMembersStep from './TeamMembersStep'
import { addNewTeam } from './teamsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const stepTitles = ['Some quick details', 'Select a cover', 'Add team members']

const AddTeamForm = ({ open, handleClose }) => {
  const currentUser = useSelector((state) => state.users.currentUser)
  const [activeStep, setActiveStep] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cover, setCover] = useState('')
  const [members, setMembers] = useState([])
  const isLastStep = activeStep === stepTitles.length - 1

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const handleNameChange = (e) => setName(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleCoverChange = (url) => setCover(url)
  const handleMemberChange = (id) => {
    members.includes(id)
      ? setMembers((prevMembers) =>
          prevMembers.filter((memberId) => memberId !== id)
        )
      : setMembers((prevMembers) => prevMembers.concat(id))
  }

  const resetForm = () => {
    setActiveStep(0)
    setName('')
    setDescription('')
    setCover('')
    setMembers([])
  }

  const handleDialogClose = () => {
    resetForm()
    handleClose()
  }

  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const canAdd =
    [name, description, cover].every(Boolean) && addRequestStatus === 'idle'
  const handleFormSubmit = async () => {
    if (canAdd) {
      try {
        const resultAction = await dispatch(
          addNewTeam({ name, description, cover_url: cover, user_ids: members })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the team: ', err)
      } finally {
        setAddRequestStatus('idle')
        resetForm()
        handleClose()
      }
    }
  }

  const renderedActiveStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <TeamDetailsStep
            name={name}
            description={description}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
          />
        )
      case 1:
        return (
          <TeamCoverStep cover={cover} handleCoverChange={handleCoverChange} />
        )
      case 2:
        return (
          <TeamMembersStep
            members={members}
            handleMemberChange={handleMemberChange}
          />
        )
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
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
        {renderedActiveStep()}
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
