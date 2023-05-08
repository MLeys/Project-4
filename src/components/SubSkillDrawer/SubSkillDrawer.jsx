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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { ListIcon, ArrowLeftIcon, BoxArrowRightIcon } from '../../customIcons';
import { AppBar, Main, DrawerHeader } from './Components';

import SubList from "../SubList/SubList";

const drawerWidth = 'auto';

export default function SubSkillsDrawer({children}) {
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
  // const [activeTabSub, setActiveTabSub] = useState(activeSkill?.subSkills[0])

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
    <Box sx={{ display: 'flex', height: '25%'}}>
      <Fab
        color="primary"
        aria-label="floating-button"
        onClick={() => toggleDrawer()}
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: theme.zIndex.appBar - 1,
        }}
      >
        {open ? <ArrowLeftIcon /> : <ListIcon height={34} width={34}/>}
      </Fab>


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
        <DrawerHeader 
          sx={{
            color: 'white', 
            justifyContent: 'space-between', 
            bgcolor: 'blueGrayLight.dark',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }} 
        >
          <Typography mt={1} fontSize={'20px'} fontWeight={800} color={'white'} >
            Subskills
          </Typography>

          <IconButton onClick={handleDrawerClose} sx={{ display: 'flex', flexFlow: 1}}>
            <i className="bi bi-arrow-left-square-fill" style={{color: 'white'}}></i>
          </IconButton>
        </DrawerHeader>

        <SubList  />
        <Divider />
      </Drawer>
      <Main open={open ? open : false} sx={{ mt: 2}}>
        {children}
      </Main>
    </Box>
  );
}