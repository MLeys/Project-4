import React, { useState, useContext, lazy, Suspense } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";


const SkillsList = lazy(() => import("../SkillsList/SkillsList"));

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const drawerWidth = 260;

export default function SkillDrawer({open, toggleDrawer }) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  
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
      transitionDuration={400}
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

      <Suspense fallback={" Loading skill list "}>
        <List sx={{ bgcolor: 'primaryDarker.main', color: 'primaryDarker.contrastText'}}>
          {skills
          ?.filter(isSkillMatched)
          .map((skill, index) => (
            <div key={`skillDrawerListIndex-${index}`}>
              <SkillsList 
                skill={skill}
                index={index}
              />
              <div>{skill.name}</div>
            </div>
            
          ))}
        </List>

      </Suspense>


      
    </SwipeableDrawer>
    </>
    
  );
};
