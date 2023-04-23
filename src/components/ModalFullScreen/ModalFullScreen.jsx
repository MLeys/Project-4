import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  overflow: 'auto',
  top: '50%',
  left: '50%',
  
  transform: 'translate(-50%, -50%)',
  width: {xs: '90%', md: '80%'},
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export default function ModalFullScreen({open, handleClose, children}) {
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{overflow: 'auto'}}
      >
        <Fade in={open} >
          <Box sx={style} m={3}>
            {children}
          </Box>
        </Fade>
      </Modal>

  );
}
