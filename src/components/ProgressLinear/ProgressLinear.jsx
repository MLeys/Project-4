import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      <Box sx={{ width: '90%', pl: 2 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" color="text.primary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function ProgressLinear({value = 0}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);  // Reset progress state when 'value' prop changes
  }, [value]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress >= value) {
        clearInterval(timer);
      } else {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, 30);
    return () => {
      clearInterval(timer);
    };
  }, [progress, value]);

  return <LinearProgressWithLabel value={progress} />;
}