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
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import useSkillsContext from '../../context/SkillsContext/SkillsContext';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
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

// export default function LoginPage({handleSignUpOrLogin, getSkills}) {
//   const [error, setError] = useState("");
//   const [state, setState] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();


//   function handleChange(e) {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       await userService.login(state);
//       // Route to wherever you want!
//       handleSignUpOrLogin();
//       navigate("/");
//     } catch (err) {
//       // Invalid user data (probably duplicate email)
//       // this is from the throw block in the userService.login first then function
//       setError(err.message);
//     }
//   }

//   return (
//     <Grid
//       textAlign="center"
//       style={{ height: "100vh", width: "100vw" }}
//       verticalAlign="middle"
//     >
//       <Grid.Column style={{ maxWidth: 450 }}>
//         <Header as="h2" color="black" textAlign="center">
//           Log-in to your account
//         </Header>
//         <Form onSubmit={handleSubmit}>
//           <Segment stacked>
//             <Form.Input
//               type="email"
//               name="email"
//               placeholder="email"
//               value={state.email}
//               onChange={handleChange}
//               required
//             />
//             <Form.Input
//               name="password"
//               type="password"
//               placeholder="password"
//               value={state.password}
//               onChange={handleChange}
//               required
//             />
//             <Button
//               color="grey"
//               fluid
//               size="large"
//               type="submit"
//               className="btn"
//             >
//               Login
//             </Button>
//           </Segment>
//         </Form>
//         <Message>
//           New to us? <Link to="/signup">Sign Up</Link>
//         </Message>
//         {error ? <ErrorMessage error={error} /> : null}
//       </Grid.Column>
//     </Grid>
//   );
// }
