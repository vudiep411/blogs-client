import React, { useState } from 'react'
import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePosts, likePost } from '../../../actions/posts';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [likes, setLikes] = useState(post.likes)

  const userId = user.result.googleId || user.result._id

  const handleLikes = () => {
    dispatch(likePost(post._id))
    if(post.likes.find((like) => like === (userId)))
    {
      setLikes(post.likes.filter((id) => id !== (userId)))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => 
  {
    if(likes)
    {
      return likes.find((like) => like === (userId))
      ? (
        <><ThumbUpAltIcon fontSize='small' />&nbsp; Like &nbsp;{likes.length}</>
        ):(
        <><ThumbUpOffAltOutlinedIcon fontSize='small' />&nbsp; Like &nbsp;{likes.length}</>
        )       
    }
  }

  return (
    <Card className={classes.card} raised elevation={6}> 
      <Link to={`/posts/${post._id}`}>     
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}></CardMedia> 
      </Link>
        <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user.result.googleId === post.creator || user.result._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button style={{color : 'white'}} size='small' 
              onClick={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize="default"/>
            </Button>
        </div>
        )}
        
        <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
        </div>
        <Typography variant="h5" className={classes.title} component="h5">{post.title}</Typography> 
          <CardContent className={classes.content}>
            <Box 
              className={classes.customBox}
              fontSize="body2.fontSize"
              component="div"
              overflow="hidden"
              textOverflow="ellipsis"
              height={92}>
              {post.message}
            </Box>
          </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary' onClick={() => {handleLikes()}}>
              <Likes/>
            </Button>
            {(user.result.googleId === post.creator || user.result._id === post.creator) && (
              <Button size='small' color='secondary' onClick={() => {dispatch(deletePosts(post._id))}}>
                <DeleteIcon fontSize='small' />
                Delete 
            </Button>
            )}       
        </CardActions>
    </Card>
  )
}

export default Post

