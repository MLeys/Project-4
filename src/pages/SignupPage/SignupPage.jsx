import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const credentials = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConf: data.get('passwordConf'),
      name: data.get('name'),
      career: data.get('career'),
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}







// import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
// import { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import userService from "../../utils/userService";

// function SignUpPage({handleSignUpOrLogin}) {
//   const [state, setState] = useState({
//     username: "",
//     email: "",
//     password: "",
//     passwordConf: "",
//     name: "",
//     career: "",
//   });

//   const [selectedFile, setSelectedFile] = useState("");

//   const [error, setError] = useState("");

//   const navigate = useNavigate()
  
//   async function handleSubmit(e) {
//     e.preventDefault(); 

//     const formData = new FormData();
//     formData.append("photo", selectedFile);

//     for (let key in state) {
//       console.log(key, "<<<<_KEY")
//       formData.append(key, state[key]);
//     }
//     console.log(formData.forEach((item) => console.log(item)));

// 	try {
		
// 		await userService.signup(formData); 
		
//     handleSignUpOrLogin();
// 		navigate('/');

// 	} catch(err){
// 		console.log(err.message, ' this is the error in signup')
// 		setError('Check your terminal, there was an error signing up')
// 	}


//   }

//   function handleChange(e) {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleFileInput(e) {
//     console.log("&&&&&&&&&   handlefileInput   &&&&&*&")
//     // e.target.files is an array, we just want the first file uploaded to set in state
//     setSelectedFile(e.target.files[0]);
//   }

//   return (
//     <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
//       <Grid.Column style={{ maxWidth: 450 }}>
//         <Header as="h2" color="black" textAlign="center">
//           Sign Up
//         </Header>
//         <Form autoComplete="off" onSubmit={handleSubmit}>
//           <Segment stacked>
//             <Form.Input
//               name="username"
//               placeholder="username"
//               value={state.username}
//               onChange={handleChange}
//               required
//             />
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
//             <Form.Input
//               name="passwordConf"
//               type="password"
//               placeholder="Confirm Password"
//               value={state.passwordConf}
//               onChange={handleChange}
//               required
//             />
//             <Form.Input
//               name="name"
//               value={state.name}
//               placeholder="Enter name"
//               onChange={handleChange}
//             />
//             <Form.Input
//               name="career"
//               value={state.career}
//               placeholder="Enter current job title or goal"
//               onChange={handleChange}
//             />
//             <Form.Field>
//               <Form.Input
//                 type="file"
//                 name="photo"
//                 placeholder="upload profile image"
//                 onChange={handleFileInput}
//               />
//             </Form.Field>
//             <Button type="submit" className="btn">
//               Signup
//             </Button>
//           </Segment>
//           {error ? <ErrorMessage error={error} /> : null}
//         </Form>
//       </Grid.Column>
//     </Grid>
//   );
// }

// export default SignUpPage;
