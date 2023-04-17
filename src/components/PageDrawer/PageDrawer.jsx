import * as React from 'react';
import mainTheme from '../../themes/mainTheme';
import { useContext, useState, useEffect } from 'react';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';

import SubList from "../../components/SubList/SubList";
import { AppBar, Main, MainTitle, PageHeader, DrawerHeader } from './Components';

const drawerWidth = 260;


export default function PageDrawer({children}) {
  const theme = useTheme();
  const ctx = useContext(SkillsContext);
  const activeSkill = ctx.activeSkill;
  const user = ctx.loggedUser;
  const isSkillAssigned = activeSkill?.skill?.usersAssigned.some(u => u._id === user._id)

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleAssignChecked(event) {
    setChecked(event.target.checked);
  };


  function handleDrawerOpen() {
    setOpen(true);
  };

  function handleDrawerClose() {
    setOpen(false);
  };

  function toggleDrawer() {
    setOpen(!open);
  }

  function checkAssignStatus() {
    isSkillAssigned ? setChecked(isSkillAssigned) : setChecked(false);
    
  }

  useEffect(() => {
    checkAssignStatus();
  }, [!isSkillAssigned]); 

  return (
    <Box sx={{ display: 'flex' }} bgcolor={'grey'} m={0} p={0}>
      <AppBar position="absolute"  open={open}>
        <Toolbar />
        <PageHeader >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer()}
            >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h2" noWrap component="h3" pl={5} fontWeight={900}>
              {activeSkill?.skill.name}
            </Typography>

            <FormControlLabel 
              label="Learn" 
              control={
                <Switch
                  checked={checked}
                  onChange={handleAssignChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              } 
            />

          </Toolbar>
        </PageHeader>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'primary.main'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <DrawerHeader sx={{color: 'white', justifyContent: 'center', bgcolor: 'primary.dark'}} >
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{color: 'white'}} /> : <ChevronRightIcon sx={{color: 'white'}}/>}
            <Typography fontSize={'20px'} fontWeight={800} color={'white'} > Subskills</Typography>
          </IconButton>
        </DrawerHeader>
        <SubList />
        <Divider />
      </Drawer>
      
      <Main open={open} >
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
}