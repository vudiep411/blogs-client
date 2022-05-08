import React, {useEffect, useState} from 'react'
import { Paper, Typography, Divider, Box, Container, Button, CircularProgress} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import useStyles from './styles'
import { getPost } from '../../actions/posts'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { likePost } from '../../actions/posts';
import Comment from './Comment'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const PostDetails = () => {
  const post = useSelector((state) => state.posts)
  const isLoading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))

  const [isComment, setIsComment] = useState(false)

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  if(post.length === 0) return null

  const Likes = () => 
  {
    if(post)
    {
      return post[0].likes.find((like) => like === (user.result.googleId || user.result._id))
      ? (
        <><ThumbUpAltIcon fontSize='small' />&nbsp; <Typography variant='p'>Like &nbsp;{post[0].likes.length}</Typography></>
        ):(
        <><ThumbUpOffAltOutlinedIcon fontSize='small' /><Typography variant='p'>&nbsp; Like &nbsp;{post[0].likes.length}</Typography></>
        )       
    }
  }

  const handleComment = () => {
    if(isComment)
      setIsComment(false)
    else
      setIsComment(true)
  }

  return ( isLoading ? <CircularProgress/> :
    (post[0] ?
    (<Container >
      <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
        <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post[0].title}</Typography>           
              <Typography variant="body2">Created by: {post[0].name}</Typography>
              <Typography variant="body2">{moment(post[0].createdAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
              <img className={classes.media} src={post[0].selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>              
              <Box className={classes.customBox} component="div" textOverflow="ellipsis" marginTop='20px'>
                <Typography gutterBottom variant="body1" component="p">{post[0].message}</Typography>
              </Box>
              <Typography gutterBottom variant="body2" color="textSecondary" component="h2">{post[0].tags.map((tag) => `#${tag} `)}</Typography><br/>   
              <Button size='small' color='primary' onClick={() => dispatch(likePost(id))}>
                <Likes/>
              </Button>
              <Button size='small' color='primary' onClick={() => {handleComment()}}>
                &nbsp;<ChatBubbleIcon fontSize='small'/>&nbsp; <Typography variant='p'>Comments</Typography>
              </Button>
        </div>
        <Divider style={{ margin: '20px 0' }} /> 
        {isComment && <Comment post={post}/>}
      </Paper>
      <Box component="div" textAlign='center' marginTop='150px'>
          <Typography gutterBottom variant="body2" component="p">©Copy right by {post[0].name}. All rights reserved</Typography>
          <Typography variant="body2">{post[0].creator}</Typography>
      </Box>
      
    </Container>) : (
      <Container maxWidth='sm'>
        <h1>STATUS 505 POST NOT FOUND!</h1>
      </Container>
    )
    )
  )
}

export default PostDetails