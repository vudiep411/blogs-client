import React, { useState } from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, Typography, TextField, Container } from '@material-ui/core'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Pagination } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

const Posts = ({setCurrentId}) => {
  const classes = useStyles()
  const posts = useSelector((state) => state.posts)
  const isLoading = useSelector((state) => state.loading)
  const [searchTerm, setSearchTerm] = useState("")
 
  const filtered = !searchTerm
    ? posts
    : posts.filter((post) =>
        post.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [pageNumber, setPageNumber] = useState(1)
  const postPerPage = 8
  const pageVisited = (pageNumber - 1) * postPerPage

  const display = filtered.slice(pageVisited, pageVisited + postPerPage)
  .map((post) => (
    <Grid key={post._id} item xs={6} sm={6} md={6} lg={3}>
      <Post post={post} setCurrentId={setCurrentId}/>
    </Grid>
  ))

  const pageCount = Math.ceil(filtered.length / postPerPage)
  const changePage = (e, value) => {
    setPageNumber(value)
  }

  return (isLoading ? <CircularProgress/> :
    (!posts.length ? (
    <div className={classes.noPosts}>
      <AddAPhotoIcon fontSize='large'/>
      <Typography variant='h5' >No Posts Yet</Typography>
    </div>) : (
      <Grid>
        <Container maxWidth='sm'>
          <TextField
          className={classes.searchBar}
          id="outlined-basic"
          variant="filled"
          fullWidth
          placeholder="Filter Posts by Title"
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Container>
        <Grid className={classes.container} container alignItems='stretch' spacing={3}>
          {display}
        </Grid>
        <Container maxWidth='xs' className={classes.pagination}>
            <Pagination 
              classes={{ul: classes.ul}}
              count={pageCount}
              onChange={changePage}
              variant="outlined"
              color="primary"
            />
        </Container>        
      </Grid>
      )
    )
  )
}

export default Posts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              