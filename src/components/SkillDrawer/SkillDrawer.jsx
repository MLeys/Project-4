import React, { useState } from "react";
import mainTheme from "../../themes/mainTheme";
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
  Button
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const theme = mainTheme;

const skills = [
  {
    name: "JavaScript",
    progress: 80,
    subSkills: [
      { name: "React", progress: 70 },
      { name: "Vue.js", progress: 40 },
    ],
  },
  {
    name: "Python",
    progress: 90,
    subSkills: [
      { name: "Django", progress: 85 },
      { name: "Flask", progress: 75 },
    ],
  },
];


const SkillDrawer = ({open, toggleDrawer }) => {
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
    <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer}>
      <TextField
        label="Search skills"
        type="search"
        margin="normal"
        fullWidth
        variant="outlined"
      />

      <Button sx={{bgcolor: 'accent.dark', color: "accent.contrastText" }} onClick={toggleDrawer()}>Close</Button>
      <List>
        {skills.map((skill, index) => (
          <div key={index}>
            <ListItemButton button onClick={() => handleSkillToggle(index)}>
              <ListItemText primary={skill.name} />
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
              <List component="div" disablePadding>
                {skill.subSkills.map((subSkill, subIndex) => (
                  <ListItem
                    key={subIndex}
                    button
                    onClick={() => handleSubSkillClick(index, subIndex)}
                  >
                    <ListItemText primary={subSkill.name} />
                    <ListItemSecondaryAction>
                      <Slider value={subSkill.progress} />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default SkillDrawer;
