import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Container, Box, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {commentPost} from '../../actions/posts'
import moment from 'moment';

import useStyles from './styles'

const Comment = ({post}) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const postComment = post[0]
    const [comments, setComments] = useState(postComment.comments) 
    const [comment, setComment] = useState('')
    console.log(post)
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleSubmit = async () => { 
        // [0] avatar, [1] username, [2] comment body, [3] Date of comment
        let finalComment    
        const date = new Date().toISOString()  
        if(user.result.imageUrl)
        {
            finalComment = `${user.result.imageUrl},${user.result.name},${comment},${date}`
        }
        else
        {
            finalComment = `${user.result.name.charAt(0)},${user.result.name},${comment},${date}`
        }
        setComment('')
        const newComments = await dispatch(commentPost(finalComment, postComment._id))   
        setComments(newComments)       
    }

    return (
        <Container maxWidth='md'>
            {/* <Typography variant="h5">Comments:</Typography> */}
            <br/>
            <form onSubmit={handleSubmit}>
                <TextField value={comment} name="comment" onChange={(e) => {setComment(e.target.value)}} multiline  placeholder='Add a comment...' lable="comment" fullWidth/>
                {comment ? (<Button onClick={handleSubmit} className={classes.inputButton} color="primary" variant="outlined" style={{ marginLeft: "auto" }}>Comment</Button>):
                (<><br/><br/><br/></>)}
            </form>
            <div className={classes.commentDiv}>
                {comments.map((c, i) => {
                    const component = c.split(',')
                    return(
                    <Paper key={i + 4} className={classes.commentBox}>
                    {component[0].length > 1 ? (
                    <Avatar key={i} className={classes.commentAvatar} src={component[0]}>{component[0]}</Avatar>
                    ):(
                    <Avatar key={i} className={classes.commentAvatar}>{component[0]}</Avatar>) }           
                        <Box key={i + 3} padding='20px' className={classes.customBox}>
                            <Typography key={i + 1} display='inline'><b>{component[1]}</b>&nbsp;</Typography>
                            <Typography key={i + 5} display='inline' variant='body2' color="textSecondary">{moment(component[3]).fromNow()}</Typography>
                            <Typography key={i + 2}>{component[2]}</Typography>
                        </Box>
                    </Paper>
                    )
                })}    
            </div>          
        </Container>
        
        
    )
}

export default Comment