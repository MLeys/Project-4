import * as React from 'react';
import mainTheme from '../../themes/mainTheme';
import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { ListIcon, ArrowLeftIcon, BoxArrowRightIcon } from '../../customIcons';
import { AppBar, Main, DrawerHeader } from './Components';

import SubList from "../SubList/SubList";


const drawerWidth = 'auto';

export default function PageDrawer({children}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleDrawerClose(e) {
    e.stopPropagation();
    setOpen(false);
  };

  function toggleDrawer(e) {
    e.stopPropagation();
    setOpen(!open);
  }

  return (
    <Box sx={{ display: 'flex', height: '25%'}}>
      <Fab
        color="primary"
        variant='extended'
        aria-label="floating-button"
        onClick={(e) => toggleDrawer(e)}
        sx={{
          position: 'fixed',
          top: theme.spacing(10),
          right: theme.spacing(2),
          zIndex: theme.zIndex.appBar - 1,
        }}
      >
        {open ? <ArrowLeftIcon /> : <ListIcon height={34} width={34}/>}
        
      </Fab>

      <ClickAwayListener onClickAway={(e) => handleDrawerClose(e)}>
        <Drawer
          sx={{
            width: 'auto',
            flexShrink: 0,
            mx: 1,
            '& .MuiDrawer-paper': {
              width: 'auto',
              boxSizing: 'border-box',
              bgcolor: 'blueGrayLight2.main'
            },
          }}
          variant="persistent"
          anchor="top"
          open={open ? open : false}
        >
          <Toolbar />

          <SubList  />
          <Divider />
        </Drawer>
      </ClickAwayListener>

      <Main open={open ? open : false} sx={{ mr: 1, mt: 2}}>
        {children}
      </Main>
    </Box>
  );
}