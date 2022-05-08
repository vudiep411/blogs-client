import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePosts } from '../../actions/posts'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles()
    const [postData, setPostData] = useState({ 
      title: '', 
      message: '', 
      tags: '', 
      selectedFile: '' 
    })

    const user = JSON.parse(localStorage.getItem('profile'))
    const [alert, setAlert] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
      if(post){setPostData(post)}
    }, [post])

    const clear = () => {
      setCurrentId(null);
      setPostData({title: '', message: '', tags: '', selectedFile: '' });
      setAlert('')
    };

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!postData.title)
      {
        setAlert('Please Enter Post Title')
      }
      else if(currentId === null)
      {
        dispatch(createPost({...postData, name: user.result.name}))
        clear()
      }
      else
      {
        dispatch(updatePosts(currentId, {...postData, name: user.result.name }))
        clear()
      }          
    }

    return (
        <Paper className={classes.paper} elevation={6}>
          {alert && <Alert severity="error">{alert}</Alert>}
          <form noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? 'Edit a post' : 'Post a Picture'}</Typography>
           <TextField
           name="title" variant="outlined" 
           placeholder='Title' 
           lable="Title" fullWidth
           value={postData.title}
           onChange={(e) => {setPostData({...postData, title: e.target.value})}}/>

           <TextField
           multiline
           minRows={5}
           name="message" variant="outlined" 
           placeholder='Captions' 
           lable="Message" fullWidth
           value={postData.message}
           onChange={(e) => {setPostData({...postData, message: e.target.value})}}/>

           <TextField
           name="tags" variant="outlined" 
           placeholder='Tags' 
           lable="Tags" fullWidth
           value={postData.tags}
           onChange={(e) => {setPostData({...postData, tags: e.target.value.split(',')})}}/>

           <div className={classes.fileInput}>
              <FileBase 
              type="file"
              multiple={false}
              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
           </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Cancel</Button>
          </form>
        </Paper>
  )
}

export default Form