import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import { programmingSkills } from "../../lists/skillTypes";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


const CreateSkillDialog = ({ open, onClose }) => {
  const ctx = useContext(SkillsContext);
  const userId = ctx.loggedUser?._id;
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  useEffect(() => {
    if (category) {
      const selectedCategory = programmingSkills.find(
        (item) => item.category === category
      );
      setSubcategories(selectedCategory.subcategories);
      setSelectedSubcategories([]);
    }
  }, [category]);

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategories(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to assign the skill to the user with their ._id
    console.log("Skill and subcategories assigned to the user");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a Skill</DialogTitle>
      <DialogContent>
        <TextField
          label="Skill Name"
          value={skillName}
          onChange={handleSkillNameChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl sx={{ marginBottom: 2, minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            {programmingSkills.map((skill) => (
              <MenuItem key={skill.category} value={skill.category}>
                {skill.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Subcategories</InputLabel>
          <Select
            multiple
            value={selectedSubcategories}
            onChange={handleSubcategoryChange}
            renderValue={(selected) => selected.join(", ")}
            sx={{ maxHeight: 200, overflow: "auto" }}
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                <Checkbox
                  checked={selectedSubcategories.indexOf(subcategory) > -1}
                />
                <ListItemText primary={subcategory} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSkillDialog;
