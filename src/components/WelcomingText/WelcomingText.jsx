import React from 'react';
import './WelcomingText.css';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function WelcomingText({ children }) {
  const titleText = 'Welcome To Skill.Map!';
  const subtitleText = `Learn, grow, and succeed`;

  return (
    <Stack  textAlign="center" pt={10}>
      <Typography
        variant="h2"
        color={'common.white'}
        className="title-animation text-shadow"
        sx={{ fontWeight: 'bold' }}
      >
        {(titleText)}
      </Typography>
      <Typography color={'common.white'} variant="h5" className="subtitle-animation text-shadow" sx={{ mt: 2 }}>
        {(subtitleText)}
      </Typography>
    </Stack>
  );
};

export default WelcomingText;
