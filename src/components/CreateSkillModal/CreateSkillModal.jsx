
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

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


const CreateSkillModal = ({ isOpen, onClose }) => {
  const handleAddSkill = useContext(SkillsContext).createSkill

  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('');

  const [state, setState] = useState({
    name: "",
    type: "",
})


  const handleNameChange = (event) => {
    setSkillName(event.target.value);
    console.log(e.target.name, "e.target.name in handleChange in Addskillform")
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
console.log(state, " <<<UPDATED STATE FROM HANDLE CHANGE")
  };

  const handleProficiencyChange = (event) => {
    setProficiency(event.target.value);
  };

  const handleSubmit = () => {
		e.preventDefault();
	
		handleAddSkill(state);
		handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle> Create New Skill </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='name'
              label="Name"
              value={state.name}
              onChange={handleNameChange}
              placeholder='Name of Skill'
              margin="normal"
              variant="outlined"
            />
            <TextField
              name='type'
              label="Type"
              value={state.type}
              onChange={handleNameChange}
              placeholder='Name of Skill'
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