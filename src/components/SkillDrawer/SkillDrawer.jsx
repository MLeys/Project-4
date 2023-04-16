import React, { useState, useContext } from "react";
import mainTheme from "../../themes/mainTheme";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemAvatar,
  Collapse,
  Slider,
  LinearProgress,
  IconButton,
  TextField,
  Box,
  Typography,
  Toolbar,
  Button,
  Divider
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";




const SkillDrawer = ({open, toggleDrawer }) => {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  const [openSkills, setOpenSkills] = useState({});

  const handleSkillClick = (skillIndex, subSkillIndex) => {
    console.log(`Clicked skill: ${skills[skillIndex].subSkills[subSkillIndex].name}`);
    // Navigate to the skill's details screen
  };

  const handleSkillToggle = (index) => {
    setOpenSkills({ ...openSkills, [index]: !openSkills[index] });
  };

  const handleSubSkillClick = (skillIndex, subSkillIndex) => {
    handleSkillClick(skillIndex, subSkillIndex);
  };

  const handleSkillIconClick = (event, index) => {
    event.stopPropagation();
    handleSkillToggle(index);
  };

  return (
    <>
    
    <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
      <Toolbar />
      <Button sx={{bgcolor: 'accent.dark', color: "accent.contrastText" }} onClick={toggleDrawer()}>
        Close
      </Button>
      <TextField
        label="Search skills"
        type="search"
        margin="normal"
        fullWidth
        variant="outlined"
      />

      <List sx={{width: '40dvw', bgcolor: 'primary.main'}}>
        {skills?.map((skill, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleSkillToggle(index)}>
              <ListItemText primary={skill.name}  sx={{pr: 2}}/>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(event) => handleSkillIconClick(event, index)}
                >
                  {openSkills[index] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
            <LinearProgress variant="determinate" value={skill.progress} />
            <Collapse in={openSkills[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{bgcolor: 'primary.light'}}>
                {skill.subSkills?.map((subSkill, subIndex) => (
                  <div key={`sidebar-${index}-${subIndex}`}>
                    <ListItemButton onClick={() => handleSubSkillClick(index, subIndex)}>
                      <ListItemText primary={subSkill.title} />
                      <ListItemSecondaryAction>
                        <Slider value={subSkill.progress} />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <LinearProgress variant="determinate" value={skill.progress} />
                  </div>
                ))}
                <Divider />
              </List>
            </Collapse>
            <Divider />
          </div>
          
        ))}
      </List>
      
    </SwipeableDrawer>
    </>
    
  );
};

export default SkillDrawer;
