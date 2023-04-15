import * as React from 'react';
import mainTheme from '../../themes/mainTheme';

import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';


import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';

import Checkbox from '@mui/material/Checkbox';



import Toolbar from '@mui/material/Toolbar';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import { PlusFilledCircleIcon, SettingsFilledcon, CaretRightFilledIcon } from '../../customIcons';

const theme = mainTheme;
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const drawerWidth = 240;

const SkillNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});


export default function SideDrawer({open, toggleDrawer}) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  const [checked, setChecked] = useState([0]);



  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  function SidebarList() {
    return (
      <List sx={{width: '100%',height: '100%', bgcolor: 'teal2.light'}}>
        <ListItemButton sx={{backgroundColor: 'teal2.dark', color: 'common.white'}} >
          <ListItemText
            primary="Learn New Skills!"
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: '400',
              letterSpacing: 0,
              m: 0,
              p: 0,
              justifyContent: 'center'
            }}
          />
        </ListItemButton>
            <Divider />
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="Settings">
                <SettingsFilledcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role='button'
              dense
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(value)();
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    );
  }


  return (

      <SwipeableDrawer
        variant='temporary'
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS} 
        allowSwipeInChildren
        anchor={'left'}
        open={open}
        transitionDuration={600}
        hideBackdrop
        elevation={24}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
          // disableEnforceFocus: true,
        }}
        
        sx={{
          
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          zIndex: 1,
        }}
      >
        <Toolbar />
        <SidebarList/>
      </SwipeableDrawer>


  );
}
