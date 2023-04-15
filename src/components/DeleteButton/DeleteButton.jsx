import * as React from 'react';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';


import { SkillsContext } from '../../context/SkillsContext/SkillsContext';
import { VertDotsIcon } from '../../customIcons';
import { LargeXIcon } from '../../customIcons';
import { TrashIcon } from '../../customIcons';
import { grey, red } from '@mui/material/colors';

function OptionsButton({ children, color='black', handleClick, handleClose, open }) {
  const ctx = useContext(SkillsContext);
  const handleDeleteResource = ctx.handleDeleteResource;
  const loggedUser = ctx.loggedUser;

  const [isUser, setIsUser] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function ifUser() {
    setIsUser(loggedUser)
  }

  function handleClick(e) {
    setAnchorEl(e.currentTarget);

  };
  function handleClose() {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
  
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: {color}}}
      >
        <TrashIcon color='red' />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          disabled={isUser} 
          onClick={() => {
          console.log(`resourceID: ${id}`)
          handleClose();
          handleDeleteResource(id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default OptionsButton;