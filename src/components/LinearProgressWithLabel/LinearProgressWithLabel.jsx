import { useState, useEffect, useContext } from "react";
import * as React from 'react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import PropTypes from 'prop-types';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


export default function LinearProgressWithLabel(props) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const activeSkill = ctx.activeSkill;
  const setActiveSub = ctx.handleSetActiveSub;
  const subSkills = skills?.[activeSkill?.index].subSkills;

  function handleClickSubProgressBar(e) {
    e.stopPropagation();
    e.stopPropagation();
    console.log("Clicked subskill" )
    const subId = props.sub._id;
    const index = subSkills?.findIndex((s) => s._id === subId);
    
    setActiveSub(index);
  }

  return (

      <Stack   
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        width={props.width ? props.width : '100%'}
        onClick={(e) => handleClickSubProgressBar(e)}
        sx={{cursor: 'pointer'}}
      >
        <Box maxWidth={'60%'} minWidth={'40%'}>
          <Typography m={0} p={0} noWrap>{props.title}</Typography>
        </Box>
        
        <Box width={'30%'} >
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box width={'10%'} >
          <Typography variant="body2" >{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Stack>
   

  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

