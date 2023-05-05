import React from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";

import { BoxArrowRightIcon, DownArrowBoxed, SettingsFilledcon } from "../../customIcons";


function SkillsList({ skill, index, toggleDrawer}) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const handleSetActiveSub = ctx.handleSetActiveSub;

  const navigate = useNavigate();

  const [openSkills, setOpenSkills] = useState({});


  const handleClickSkillArrow = ( skillIndex) => {
    toggleDrawer(false);
    handleSkillToggle(skillIndex)
    handleSetActiveSkill(skillIndex);
    const skillId = skills[skillIndex]?._id;
    console.log(skillId, "<<<<< SKILL ID")

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

  
  
  return ( 
    <div key={`skillInList-${index}`}>
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
            <SettingsFilledcon height={20} width={20} fill="white"/>                  
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
      <LinearProgress variant="determinate" value={50} color="warning" sx={{mb: 1}} />
      <Collapse in={openSkills[index]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{bgcolor: 'primary.dark'}}>
          {skill.subSkills?.map((subSkill, subIndex) => (
            <div key={`sidebar-${index}-${subIndex}`}>
              <ListItemButton onClick={() => handleSubSkillClick(index, subIndex)}>
                <ListItemText primary={subSkill.title} />
              </ListItemButton>
              <LinearProgress variant="determinate" value={50} />
            </div>
          ))}
          <Divider />
        </List>
      </Collapse>
      <Divider />
    
    </div>

   );
}

export default SkillsList;