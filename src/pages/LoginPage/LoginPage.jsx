import * as React from 'react';
import { useContext } from 'react';
import userService from "../../utils/userService";
import { useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import useSkillsContext from '../../context/SkillsContext/SkillsContext';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

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
function handleClickForgot() {
  alert("Sorry! Functionality not currently available :(")
}

const theme = createTheme();

export default function LoginPage() {
  const ctx = useContext(SkillsContext)
  const handleSignUpOrLogin = ctx.handleSignUpOrLogin;

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const credentials = {
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      await userService.login(credentials);
      // Route to wherever you want!
      handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err, "<-- error with signin")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          xs={false}
          sm={5}
          md={7}
          children={<WelcomeSection />}
        />
        <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleClickForgot}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
