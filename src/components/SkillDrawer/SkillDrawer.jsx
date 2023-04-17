import React, { useState, useContext } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import { BoxArrowRightIcon, DownArrowBoxed } from "../../customIcons";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const drawerWidth = 260;

export default function SkillDrawer({open, toggleDrawer }) {
  const navigate = useNavigate();
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const handleSetActiveSub = ctx.handleSetActiveSub;

  const skillId = useParams()?.skillId;
  const activePageSkillIndex = skillId ? skills?.findIndex(skill => skill?._id === skillId) : "";


  const [openSkills, setOpenSkills] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const isSkillMatched = (skill) => {
    return (
      skill.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      skill.subSkills.some((subSkill) =>
        subSkill.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleClickSkillArrow = ( skillIndex) => {
    toggleDrawer(false);
    handleSkillToggle(skillIndex)
    handleSetActiveSkill(skillIndex);
    const skillId = skills[skillIndex]?._id
    navigate(`/skills/${skillId}`)
  };

  const handleSkillToggle = ( skillIndex) => {
    setOpenSkills({ ...openSkills, [skillIndex]: !openSkills[skillIndex] });
    handleSetActiveSkill(skillIndex);
  };

  const handleSubSkillClick = (skillIndex, subSkillIndex) => {
    if (skillIndex === activePageSkillIndex) {
      handleSetActiveSub(subSkillIndex);
    }
  };

  const handleSkillIconClick = (event, index) => {
    event.stopPropagation();
    toggleDrawer();
  };

  return (
    <>
    
    <SwipeableDrawer 
      variant='temporary'
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS} 
      allowSwipeInChildren
      anchor={'left'}
      open={open}
      onClick={() => toggleDrawer()}
      transitionDuration={800}
      hideBackdrop
      elevation={24}
      onClose={() => handleSkillIconClick()}
      onOpen={() => toggleDrawer()}
      ModalProps={{
        keepMounted: false, // Better open performance on mobile.
        // disableEnforceFocus: true,
      }}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, minHeight: '100%', bgcolor: 'primaryDarker.dark' },
        zIndex: 1100
      }}
    >
      <Toolbar />
      <Button sx={{ mt: 1, bgcolor: 'accent.dark', color: "accent.contrastText" }} onClick={toggleDrawer()}>
        Close
      </Button>
      <TextField
        label="Search skills"
        type="search"
        margin="normal"
        variant="filled"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <List sx={{ bgcolor: 'primaryDarker.main', color: 'primaryDarker.contrastText'}}>
        {skills
        ?.filter(isSkillMatched)
        .map((skill, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleSkillToggle( index)}>
              <ListItemText primary={skill.name}  sx={{pr: 2}}/>
              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  size="small"
                >
                  {openSkills[index] ? <DownArrowBoxed /> : <BoxArrowRightIcon  />}
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={(event) => handleClickSkillArrow(index)}
                >
                  <BoxArrowRightIcon height={20} width={20} fill="white"/>                  
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
            <LinearProgress variant="determinate" value={skill.progress} color="warning" sx={{mb: 1}} />
            <Collapse in={openSkills[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{bgcolor: 'primary.dark'}}>
                {skill.subSkills?.map((subSkill, subIndex) => (
                  <div key={`sidebar-${index}-${subIndex}`}>
                    <ListItemButton onClick={() => handleSubSkillClick(index, subIndex)}>
                      <ListItemText primary={subSkill.title} />
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
