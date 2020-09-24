import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import ReactQuill, { Quill } from 'react-quill'
import quillEmoji from 'quill-emoji'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import { selectTeamById } from '../teams/teamsSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'inherit',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& #emoji-palette': {
      top: '-310px !important',
    },
  },
}))

const QuillEditor = ({ sendMessage, teamId }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const quillRef = useRef(null)

  const team = useSelector((state) => selectTeamById(state, teamId))

  useEffect(() => {
    if (!team) return
    const editor = quillRef.current.getEditor()
    editor.root.dataset.placeholder = `Message #${team.name}`
  }, [team])

  const handleClick = () => {
    const editor = quillRef.current.getEditor()
    sendMessage(JSON.stringify(editor.getContents()))
    setValue('')
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        ref={quillRef}
        style={style}
      />
      <IconButton color="primary" onClick={handleClick}>
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

const style = {
  flexGrow: 1,
  maxWidth: 'calc(100% - 80px)',
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'link'],
    ['blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ color: [] }, { background: [] }],
    ['clean'],
    ['emoji'],
  ],
  'emoji-toolbar': true,
  'emoji-textarea': false,
  'emoji-shortname': true,
}

Quill.register(
  {
    'formats/emoji': quillEmoji.EmojiBlot,
    'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
    'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
    'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
  },
  true
)

export default QuillEditor
