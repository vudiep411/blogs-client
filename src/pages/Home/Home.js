import React, { useState, useEffect } from 'react'
import { Grow, Grid } from '@material-ui/core'
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import useStyles from './styles'


const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles()
    
    useEffect(() => {
        dispatch(getPosts())
    },[dispatch])

    return (             
            <Grow in>                
                <Grid className={classes.grid} container alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <Posts setCurrentId={setCurrentId}/>
                        
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.form}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>                              
            </Grow>
    )
}

export default App;