const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <LoadingBackdrop />
  }

  const renderedConstantComponents = () => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
          <AuthenticatedNav />
          <SideBar />
        </React.Fragment>
      )
    }
    return <Nav />
  }

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      {renderedConstantComponents()}
      <main>
        <SideBar />
        <Switch>
          <Route path="/dashboard" component={PlaceHolder} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/teams" component={TeamsGrid} />
          <Route exact path="/teams/new" component={AddTeamForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </main>
    </div>
  )
}

export default App




import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const images = [
  {
    url: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
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
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}


// import { Paper, Box } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

// import React, { useState, useRef, useCallback } from 'react'
// import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
// import ToolBar from './ToolBar'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: 'fixed',
//     bottom: theme.spacing(2),
//     width: '70%',
//   },
// }))

// const DraftEditor = () => {
//   const classes = useStyles()
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   )
//   const editor = useRef()
//   const focusEditor = useCallback(() => {
//     if (editor.current) {
//       editor.current.focus()
//     }
//   }, [editor])

//   const handleKeyCommand = (command, editorState) => {
//     const nextState = RichUtils.handleKeyCommand(editorState, command)
//     if (nextState) {
//       setEditorState(nextState)
//       return true
//     }
//     return false
//   }

//   const mapKeyToEditorCommand = (e) => {
//     if (e.keyCode === 9) {
//       const nextState = RichUtils.onTab(e, editorState, 4)
//       if (nextState !== editorState) {
//         setEditorState(nextState)
//       }
//       return
//     }
//     return getDefaultKeyBinding(e)
//   }

//   const toggleBlockType = (blockType) => {
//     const nextState = RichUtils.toggleBlockType(editorState, blockType)
//     setEditorState(nextState)
//   }

//   const toggleInlineStyle = (inlineStyle) => {
//     const nextState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
//     setEditorState(nextState)
//   }

//   const toggleCode = () => {
//     const nextState = RichUtils.toggleCode(editorState)
//     setEditorState(nextState)
//   }

//   return (
//     <div className={classes.root}>
//       <Paper variant="outlined">
//         <Box onClick={focusEditor} p={1.5}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             customStyleMap={styleMap}
//             editorState={editorState}
//             handleKeyCommand={handleKeyCommand}
//             keyBindingFn={mapKeyToEditorCommand}
//             onChange={setEditorState}
//             placeholder="Message..."
//             ref={editor}
//             spellCheck={true}
//           />
//         </Box>
//         <Box p={1}>
//           <ToolBar
//             toggleBlockType={toggleBlockType}
//             toggleInlineStyle={toggleInlineStyle}
//             toggleCode={toggleCode}
//           />
//         </Box>
//       </Paper>
//     </div>
//   )
// }

// const styleMap = {
//   CODE: {
//     border: '1px solid gray',
//     borderRadius: '4px',
//     backgroundColor: '#E0E0E0',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// }

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case 'blockquote':
//       return 'RichEditor-blockquote'
//     default:
//       return null
//   }
// }

// export default DraftEditor
