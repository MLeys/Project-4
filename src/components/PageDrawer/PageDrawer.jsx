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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { ListIcon, ArrowLeftIcon, BoxArrowRightIcon } from '../../customIcons';
import { AppBar, Main, DrawerHeader } from './Components';

import SubList from "../../components/SubList/SubList";

const drawerWidth = 260;

export default function PageDrawer({children}) {
  const theme = useTheme();
  const ctx = useContext(SkillsContext);
  const activeSkill = ctx.activeSkill;
  const user = ctx.loggedUser;
  const handleAssignSkill = ctx.handleAssignSkill;
  const handleUnAssignSkill = ctx.handleUnAssignSkill;
  const skillId = useParams().skillId;

  const isSkillAssigned = activeSkill?.skill?.usersAssigned?.some(u => u._id === user._id)

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleAssignChecked(e) {
    checked ? handleUnAssignSkill(skillId) : handleAssignSkill(skillId);
    isSkillAssigned === true ? setChecked(true) : setChecked(false) 
    setChecked(!checked);
  };

  function handleDrawerClose() {
    setOpen(false);
  };

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: 'flex'}} >
      <AppBar position='fixed' sx={{pt: 1}} open={open ? open : false}>
        <Toolbar />
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open skills"
            onClick={() => toggleDrawer()}
          >
            {open ? <ArrowLeftIcon /> : <ListIcon height={34} width={34}/>}
          </IconButton>
          <Typography align='left' variant="h5" noWrap component="div" pl={1} sx={{ flexGrow: 1 }}>
            {activeSkill?.skill.name}
          </Typography>
          <FormControlLabel 
            label="Learn" 
            control={ <Switch checked={checked} onChange={handleAssignChecked}/> } 
          />
        </Toolbar>
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
        open={open ? open : false}
      >
        <Toolbar />
        <DrawerHeader sx={{color: 'white', justifyContent: 'center', bgcolor: 'primary.dark'}} >
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ArrowLeftIcon sx={{color: 'white'}} /> : <BoxArrowRightIcon sx={{color: 'white'}}/>}
            <Typography fontSize={'20px'} fontWeight={800} color={'white'} > Subskills</Typography>
          </IconButton>
        </DrawerHeader>
        <SubList />
        <Divider />
      </Drawer>
      
      <Main open={open ? open : false } sx={{my: 1}}>
        {children}
      </Main>
    </Box>
  );
}