import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function LinearProgressWithLabel(props) {
  return (
    <Stack   
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0}
      width={props.width ? props.width : '100%'}
    >
      <Box width={'60%'}>
        <Typography m={0} p={0} noWrap>{props.title}</Typography>
      </Box>
      
      <Box sx={{ width: '30%' }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ width: '10%' }}>
        <Typography variant="body2" >{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Stack>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

