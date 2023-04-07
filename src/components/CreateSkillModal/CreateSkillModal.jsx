import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const CreateSkillModal = ({ isOpen, onClose }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('');

  const handleNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleProficiencyChange = (event) => {
    setProficiency(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Create Skill here")
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle> Create New Skill </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={skillName}
              onChange={handleNameChange}
              margin="normal"
              variant="outlined"
            />
            <FormControl variant="outlined" margin="normal">
              <InputLabel>Proficiency</InputLabel>
              <Select value={proficiency} onChange={handleProficiencyChange}>
                <MenuItem value={1}>Beginner</MenuItem>
                <MenuItem value={2}>Intermediate</MenuItem>
                <MenuItem value={3}>Advanced</MenuItem>
              </Select>
            </FormControl>

          </form>
        </DialogContent>


        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>

   
    </Dialog>
  );
};

export default CreateSkillModal;
