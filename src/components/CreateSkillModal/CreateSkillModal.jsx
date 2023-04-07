import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

  const handleCreate = () => {
    console.log("Create Skill here")
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal">
        <h2>Create a New Skill</h2>
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
        <Button onClick={handleCreate}>Create</Button>
      </div>
    </Modal>
  );
};

export default CreateSkillModal;
