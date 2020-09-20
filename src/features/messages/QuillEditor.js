import React, { useState, useRef, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import quillEmoji from 'quill-emoji'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import { Paper, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > #emoji-palette': {
      bottom: theme.spacing(2),
    },
  },
}))

const style = {
  flexGrow: 1,
  maxWidth: 'calc(100% - 80px)',
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

const QuillEditor = ({ sendMessage }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const quillRef = useRef(null)

  const handleSubmit = () => {
    const editor = quillRef.current.getEditor()
    sendMessage(JSON.stringify(editor.getContents()))
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
      <IconButton color="primary" onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

export default QuillEditor
