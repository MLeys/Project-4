import React, { useState, useContext } from 'react';
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
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { programmingSkills } from '../../lists/skillTypes';
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


export default function CreateSkillModal({ isOpen, onClose })  {
  const handleAddSkill = useContext(SkillsContext).createSkill;

  const [skillName, setSkillName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [proficiency, setProficiency] = useState('');

  const handleNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategories = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedCategories);
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.name;
    const isChecked = event.target.checked;
    const updatedSelectedSubcategories = isChecked
      ? [...selectedSubcategories, subcategory]
      : selectedSubcategories.filter((sc) => sc !== subcategory);
    setSelectedSubcategories(updatedSelectedSubcategories);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSkill = {
      name: skillName,
      categories: selectedCategories,
      subcategories: selectedSubcategories,
      proficiency: proficiency
    };
    handleAddSkill(newSkill);
    onClose();
  };

  const filteredSubcategories = selectedCategories.length
    ? programmingSkills
        .filter((category) => selectedCategories.includes(category.category))
        .flatMap((category) => category.subcategories)
    : [];

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle> Create New Skill </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={skillName}
            onChange={handleNameChange}
            placeholder='Name of Skill'
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              variant="outlined"
              renderValue={(selected) => selected.join(', ')}
            >
              {programmingSkills.map((category) => (
                <MenuItem key={category.category} value={category.category}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategories</InputLabel>
            <FormGroup>
              {filteredSubcategories.map((subcategory) => (
                <FormControlLabel
                  key={subcategory}
                  control={
                    <Checkbox
                      name={subcategory}
                      checked={selectedSubcategories.includes(subcategory)}
                      onChange={handleSubcategoryChange} />
                    }
                    label={subcategory}
                  />
                ))}
              </FormGroup>
            </FormControl>

          </form>
        </DialogContent>
      
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Skill</Button>
        </DialogActions>
      </Dialog>
  )
}
      
                   
