import * as React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";

import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';



import { SkillsContext } from '../../context/SkillsContext/SkillsContext';
import { FormLabel, InputLabel } from '@mui/material';



function Copyright(props) {
  return (
    <Box pb={1} color={'whitesmoke'} variant="body2" align="center" >
      {'Copyright © '}
      <Link color={'inherit'} href="https://leys.dev/">
        www.Leys.dev 
      </Link>{' '}
      {2023}
    </Box> 
  );
}

export default function SignUpPage({ children, onSubmit }) {
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

    const updatedState = {
      ...state,
      username: state.email, // Set the username as the email by default
    };  

    for (let key in state) {
      formData.append(key, updatedState[key]);
    }
    console.log(formData.forEach((item) => console.log(item)));
    try {
      await userService.signup(formData);
      handleSignUpOrLogin();
      navigate('/');
      onSubmit && onSubmit(); // Call the onSubmit callback if it is provided
    } catch (err) {
      console.log(err.message, ' this is the error in signup');
      setError('Check your terminal, there was an error signing up');
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
      <Container component="main" maxWidth="xs" sx={{bgcolor: 'blueGray.dark', borderRadius: '4%'}}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2,bgcolor: 'blueGray.dark'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color='secondary'
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                  inputProps={{ style: { color: 'white' } }} 
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
                  inputProps={{ style: { color: 'white' } }} 
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
                  inputProps={{ style: { color: 'white' } }} 
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
                  id="passwordConf"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ width: '100%', ml: 0.2 }}
                  control={
                    <FormControl fullWidth error={Boolean(error)}>
                      <InputLabel htmlFor="photo-input" sx={{ display: 'none' }}>
                        Upload Profile Image
                      </InputLabel>
                      <Input
                        color="secondary"
                        id="photo-input"
                        type="file"
                        name="photo"
                        onChange={handleFileInput}
                        sx={{ display: 'none' }}
                        title="fgff"
                      />
                    </FormControl>
                  }
                />
                <label htmlFor="photo-input">
                  <Button
                    
                    variant="outlined"
                    name="photo"
                    type="file"
                    accept
                    component="span" // Add this line
                    title="Upload Profile Image"
                    aria-label="upload profile image"
                    sx={{
                      width: '100%',
                      border: '1px solid black',
                      backgroundColor: 'blueGrayLight2.main',
                      color: 'black',
                      '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'blueGrayLight2.light',
                        border: '4px',
                      },
                    }}
                  >
                    Upload Profile Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            {children}
            <Typography color={'white'} variant="body2" sx={{ my: 1 }}>
              Already have an account?{' '}
              <Link
                component="button"
                onClick={() => navigate('/login')}
                sx={{
                  textDecoration: 'underline',
                  color: 'white',
                  '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>

          </Box>
        </Box>
        <Copyright sx={{ my: 5 }} />
      </Container>
  );
}