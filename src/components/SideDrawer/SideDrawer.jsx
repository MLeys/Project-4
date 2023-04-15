import * as React from 'react';
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

import Toolbar from '@mui/material/Toolbar';


const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const drawerWidth = 240;

export default function SideDrawer({open, toggleDrawer}) {


  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Temp', 'List', 'Items'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Temp', 'List', 'Items'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        variant='temporary'
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS} 
        allowSwipeInChildren
        anchor={'left'}
        open={open}
        onClick={() => toggleDrawer()}
        transitionDuration={800}
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
          zIndex: 1
        }}
      >
        <Toolbar />
        {list()}
        
      </SwipeableDrawer>

    </>


  );
}
