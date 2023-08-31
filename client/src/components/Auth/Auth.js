import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useGoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import Input from './input';
import Icon from './Icon';
import { signin,signup } from '../../actions/auth';

const initialState = {
  firstName:'', lastName:'', email:'', password:'',confirmPassword:''
}

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassWord] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassWord(false);
  }

  const handleShowPassword = () => setShowPassWord((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => { 
    e.preventDefault();
    
    if(isSignUp){
      dispatch(signup(formData, navigate))
      
    }else{
      dispatch(signin(formData, navigate))
    }
  };


  // handling form data
  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]:e.target.value })
  };



//google sign in function.
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse?.access_token;
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
        const result = userInfo.data
        // console.log(userInfo)
      try {
        dispatch({type:'AUTH', data: {result, token}})
        // console.log(result);
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    },
    
    onError: errorResponse => console.log(errorResponse),
  });


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} half />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password' />}
          </Grid>

          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          {/*  custom google sign in button */}
          <Button className={classes.googleButton} color='primary' fullWidth onClick={() => googleLogin()} startIcon={<Icon />} variant='contained'>
            Google Sign In
          </Button>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>{
                isSignUp ? "Already have an Account ? Sign In" : "Don't have an Account ? Sign Up"
              }</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;