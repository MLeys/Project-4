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
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { BoxArrowRightIcon, DownArrowBoxed, SettingsFilledcon } from "../../customIcons";


const CaretDownIcon = () => <i className="bi bi-caret-down" style={{ color: 'black'}} />;
const CaretLeftIcon = () => <i className="bi bi-caret-left" style={{ color: 'black'}} />;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;

function SkillsList({ skill, index, toggleDrawer}) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const activeSkill = ctx.activeSkill;
  const assignSkill = ctx.handleAssignUserToSkill;
  const unAssignSkill = ctx.handleUnAssignUserFromSkill;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;

  const usersAssigned = skill?.usersAssigned;
  const isAssigned = checkIfUserAssigned(usersAssigned)

  const navigate = useNavigate();

  const [openSkills, setOpenSkills] = useState({});

  function handleClickAssignIcon(e, skill) {
    e.stopPropagation();
  
    if (isAssigned) {
      unAssignSkill(skill)
    } else {
      assignSkill(skill)
    }
  }

  function handleClickSkillArrow(e, skillIndex) {
    e.stopPropagation(); // Add this line to stop propagation
    toggleDrawer(false);
    setOpenSkills({ ...openSkills, [skillIndex]: !openSkills[skillIndex] });
  }
  
  function handleClickSkill(e, skillIndex) {
    e.stopPropagation(); // Add this line to stop propagation
    handleSetActiveSkill(skillIndex);
    const skillId = skills[skillIndex]?._id;
    console.log(skillId, "<<<<< SKILL ID");
    navigate(`/skills/${skillId}`);
  }

  function handleSubSkillClick(skillIndex, subSkillIndex) {
    if (skillIndex === activePageSkillIndex) {
      handleSetActiveSub(subSkillIndex);
    }
  }

  
  
  return ( 
    <>
      <ListItemButton 
        onClick={(e) => handleClickSkill(e, index)}
        sx={{
          backgroundColor: activeSkill?.index === index ? "blueGrayLight2.light" : "transparent",
          "&:hover": {
            backgroundColor: "blueTealLight.main",
          },
          my: 0,
          py: 0,
        }}
        
      >
        <ListItemText 
          
          primary={
            <>
              <Typography my={0} py={0}>
                <IconButton
                  edge="start"
                  size="large"
                  onClick={(e) => handleClickSkillArrow(e, index)}
                >
                  {openSkills[index] ? <CaretLeftIcon /> : <CaretDownIcon  />}
                </IconButton>
                {skill.name}
              </Typography>
            </>
          }
          sx={{py: 0, my: 0}}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={(e) => handleClickAssignIcon(e, skill)}
          >
            {isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon /> }                 
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
      <Collapse in={openSkills[index]} timeout="auto" unmountOnExit>
        <List 
          component="div" 
          disablePadding 
        >
          {skill.subSkills?.map((subSkill, subIndex) => (
            <div key={`sidebar-${index}-${subIndex}`}>
              <ListItemButton onClick={() => handleSubSkillClick(index, subIndex)}>
                <ListItemText primary={subSkill.title} />
              </ListItemButton>
            </div>
          ))}
          <Divider />
        </List>
      </Collapse>
      <Divider />
    
    </>

   );
}

export default SkillsList;