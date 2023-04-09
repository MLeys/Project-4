import * as React from 'react';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';


function DeleteButton({ children , id}) {
  const ctx = useContext(SkillsContext);
  const handleDeleteResource = ctx.handleDeleteResource;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 const Icon = children;

  return (
    <div>
      <Icon
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Icon>
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
        <MenuItem onClick={() => {
          console.log(`resourceID: ${id}`)
          handleClose();
          handleDeleteResource(id);
        }}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>AddNote</MenuItem>
      </Menu>
    </div>
  );
}
export default DeleteButton;