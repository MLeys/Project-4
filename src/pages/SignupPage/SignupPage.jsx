import * as React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";


import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';
const theme = createTheme();


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://leys.dev/">
        www.Leys.dev 
      </Link>{' '}
      {2023}
    </Typography>
  );
}


export default function SignUp() {
  const ctx = useContext(SkillsContext)
  const handleSignUpOrLogin = ctx.handleSignUpOrLogin;
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    name: "",
    career: "",
  });


  
  async function handleSubmit(e) {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }
    console.log(formData.forEach((item) => console.log(item)));
    try {
      await userService.signup(formData); 
      handleSignUpOrLogin();
      navigate('/');

    } catch(err){
      console.log(err.message, ' this is the error in signup')
      setError('Check your terminal, there was an error signing up')
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  return (
      <Container component="main" maxWidth="xs" sx={{bgcolor: 'primarySat.light'}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography mt={5} component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color='secondary'
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  color='secondary'
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={state.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item  xs={6}>
                <TextField
                  color='secondary'
                  required
                  name="password"
                  value={state.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color='secondary'
                  required
                  name="passwordConf"
                  value={state.passwordConf}
                  label="Confirm Password"
                  type="password"
                  id="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </Grid>
              

              <FormControlLabel
                sx={{mt: 5, pl: 5}}
                control={
                  <FormControl fullWidth error={Boolean(error)}>               
                  <Input
                    color='secondary'
                    id="photo-input"
                    type="file"
                    name="photo"
                    onChange={handleFileInput}
                  />
                  </FormControl>}
                label={<Typography width={'100%'} fontSize={'20px'}> Upload a profile Image (optional) </Typography>}
                labelPlacement='top'
              />
            </Grid>
            
            <Button
              color='primary'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container sx={{ backgroundColor: 'blueTeal.dark'}} justifyContent="center" color={'black'}>
              <Link  component={Button} onClick={() =>navigate('/login')} variant="body2">
                <Typography component={Button} color={'white'}> 
                    Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ my: 5 }} />
      </Container>
  );
}