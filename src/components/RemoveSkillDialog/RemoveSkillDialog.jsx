import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import mainTheme from "../../themes/mainTheme";

const BookOutlineIcon = () => <i className="bi bi-book" style={{ color: 'black'}}/>;
const BookFilledIcon = () => <i className="bi bi-book-fill" style={{ color: mainTheme.palette.blueTealLight.main}}/>;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveSkillDialog({skill, setOpen, open, handleClose, children}) {
  const ctx = useContext(SkillsContext);
  const unAssignSkill = ctx.handleUnAssignUserFromSkill;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;

  const usersAssigned = skill?.usersAssigned;
  const isAssigned = checkIfUserAssigned(usersAssigned)

  function handleClickRemove(e) {
    e.stopPropagation();
    if (isAssigned) {
      unAssignSkill(skill);
    }
    handleClose();
  }

  return (
    <>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // sx={{bgcolor: 'primary.main'}}
        PaperProps={{
          sx: {
            bgcolor: 'blueGrayLight2.light',
            color: 'black'
          }
        }}

      >
        <DialogTitle>{`Stop learning ${skill.name}?`}</DialogTitle>

          <DialogContentText
           id="alert-dialog-slide-description"
           color={'black'}
          >
            Clicking 'Remove' will delete the skill from your list of skills you want to learn. 
            This will result in changed progress.
          </DialogContentText>

        <DialogActions>
          <Button color='primary' variant='contained' onClick={handleClose}>Cancel</Button>
          <Button color='error' variant='contained' onClick={(e) => handleClickRemove(e)}>Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}