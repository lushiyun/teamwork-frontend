import React, { useState } from 'react'

const AddTeamForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const handleNameChange = (e) => setName(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleQueryChange = (e) => setQuery(e.target.value)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return <div></div>
}

export default AddTeamForm
