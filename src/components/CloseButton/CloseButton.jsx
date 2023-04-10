import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';




export default function CloseButton({close}) {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      key={'closeFloat'}
      in={true}
      timeout={900}
      style={{
        transitionDelay: '1s',
      }}
      unmountOnExit
    >
      <Fab color="accent" aria-label="close" 
        sx={{ position: 'absolute', top: 0, right: 0}}
        onClick={() => close()}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
}
