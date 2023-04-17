import React from "react";
import { useContext } from "react";
import {  useNavigate } from "react-router-dom";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Container from '@mui/material/Container';

import WelcomingText from "../WelcomingText/WelcomingText";

function WelcomeSection() {
  const navigate = useNavigate();

  
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '65dvh',
          backgroundImage: 'url("https://imgur.com/8a9yE3m.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box className="background-overlay" >
          <Box pt={12}>
            <WelcomingText />
          </Box>
      
        </Box>
      </Box>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" gutterBottom>
          Start Your Journey
        </Typography>
        <Typography variant="body1" paragraph>
          Our app helps you develop and track your skills effectively. With our easy-to-use interface and powerful features, you'll be able to master your skills in no time. Join us today and unlock your full potential!
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() =>navigate(`/signup`) }>
          Get Started Now!
        </Button>
      </Container>
    </>
   
   );
}

export default WelcomeSection;