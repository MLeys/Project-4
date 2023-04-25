import * as React from 'react';
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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


import { getSkillsFromServer } from '../../App';
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

export default function SignUpPage({ children, handleNext}) {
  const ctx = useContext(SkillsContext)
  const handleSignUpOrLogin = ctx?.handleSignUpOrLogin;
  const user = ctx.loggedUser;
  const logout = ctx.handleLogout;
  const navigate = useNavigate()
  const location = useLocation();

  const [imageURL, setImageURL] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConf: "",
    name: "",
  });


  async function handleSubmit(e) {
    e.preventDefault(); 
    console.log('pressed submit signup')
    console.log(location, "< -- location")
    console.log(location.pathname, " location pathname")

    if (user) {
      console.log('A User is already logged in, logging out to signup new user')
      logout();
    }
    const formData = new FormData();
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }
    formData.append("username", state.email)

    for (let key in state) {
      formData.append(key, state[key]);
    }
    console.log(formData, "<--- FORM DATA")
    console.log(formData.forEach((item) => console.log(item)));

    try {

      console.log('here in handle submit before userservice')
      await userService.signup(formData);
      console.log('after userservice')
      await handleSignUpOrLogin();
      console.log('aftrer handlesignuoporlogin')
      await handleNext();
      // navigate('/');
      
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
    setImageURL(URL.createObjectURL(e.target.files[0]));
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
              {imageURL && (
                <Avatar
                  alt="Uploaded Profile Image"
                  src={imageURL}
                  sx={{ width: 56, height: 56, marginBottom: 1 }}
                />
              )}
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
                    // accept="image/*"
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
            <Button
              color='primary'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Next
            </Button>
            {children && React.cloneElement(children, { handleSubmit })}

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