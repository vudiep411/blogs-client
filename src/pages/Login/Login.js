import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import useStyles from './style'
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { Alert } from '@mui/material';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

export default function SignUp(props) {
  const [isSignup, setIsSignup] = useState(props)
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [alertMessage, setAlertMessage] = useState()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if all fields filled out
    if(isSignup && (!formData.firstName || !formData.lastName || !formData.email || !formData.password))
    {
      setAlertMessage("Please enter all required fields")
    }

    // Check if passwords are matched
    else if(isSignup && (formData.password !== formData.confirmPassword))
    {
      setAlertMessage("Password do not match")
    }

    // Proceed to signup or signin
    else
    {
      if(isSignup)
      {
        const msg = await dispatch(signup(formData, navigate))

        if(msg)
          setAlertMessage(msg)       
      }
      else
      {
        const msg = await dispatch(signin(formData, navigate))

        if(msg)        
          setAlertMessage(msg)
        
      }
    }  
  }

  const googleSuccess = async (res) => {
    const result = res.profileObj
    const token = res.tokenId
    try {
        dispatch({type: 'AUTH', data: {result, token}})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  const googleFailure = (err) => {
      console.log(err)
      console.log("Fail")
  }
 

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {alertMessage && ( 
          <Grid className={classes.alert}>    
            <Alert severity="error">{alertMessage}</Alert>
          </Grid>    
        )}
        <Paper className={classes.paper} elevation={6}>       
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ marginBottom:2 }}>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && 
              (<>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              </>)
              }
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              {isSignup && 
              (<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>)}
            </Grid>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}>
                {isSignup ? 'Sign Up' : 'Sign in'}
              </Button>
            </form>
            <Grid sx={{ marginBottom:2}} >
                <GoogleLogin
                    clientId="178051009869-91ic2jujjtdk77bsafbg6b63ef3gm6c3.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </Grid>
            <Grid container justifyContent="flex-end">                
              { isSignup ?
                (<Grid item>
                    <Button variant="body2" onClick={() => {setIsSignup(false); setAlertMessage('')}}>Already have an account? Sign in</Button>
                </Grid>) :
                 (<Grid item>
                    <Button variant="body2" onClick={() => {setIsSignup(true); setAlertMessage('')}}>Don't have an account? Sign up</Button>
                </Grid>)}
            </Grid>
          </Box>
        </Paper>
      </Container>
    
  );
}