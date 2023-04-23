import React from 'react';
import mainTheme from "../../themes/mainTheme";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';


const TrashFilledIcon = ({color='white'}) => <i className="bi bi-trash3-fill" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;


export default function SkillCardActions({resource, index}) {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;
  const activeSub = ctx.activeSub;
  const skillId = useParams().skillId;

  const deleteResource = ctx.handleDeleteResource;
  const assignUserToResource = ctx.handleAssignUserToResource;
  const unAssignUserFromResource = ctx.handleUnAssignUserFromResource;
  const handleDeleteResourcesByVideoId = ctx.handleDeleteResourcesByVideoId;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;

  const skillIndex = skills?.findIndex((skill) => skill._id === skillId)
  const subIndex = skills[skillIndex]?.subSkills?.findIndex((sub) => sub._id === activeSub?.subSkill._id)
  const subSkills = skills[skillIndex]?.subSkills;
  const resources = skills[skillIndex]?.subSkills[subIndex]?.resources;
  

  function handleClickDeleteAllByVideoId() {
    handleDeleteResourcesByVideoId()
  }

  function handleDeleteResource(resource) {
    deleteResource(resource)
  }


  function renderIcon(resource) {
    // console.log(resource, "THIS IS THE FUCKING RESOURCE FOR THE CARD")
    return checkIfUserAssigned(resource.usersAssigned) ? <BookFilledIcon /> : <BookOutlinedIcon />;
  }

  function handleClickAssigned(resource, index) {
    const isUserAssigned = checkIfUserAssigned(resource.usersAssigned);
    isUserAssigned
      ? unAssignUserFromResource(resource )
      : assignUserToResource(resource );
  }


  useEffect(() => {
    handleSetActiveSkillById(skillId)
  }, []); 

  return ( 
    <CardActions disableSpacing>
      <IconButton 
        aria-label="Delete resource"
        onClick={() => handleDeleteResource(resource, index)}
      >
        <TrashFilledIcon />
      </IconButton>
      <IconButton 
        aria-label="Delete resource"
        onClick={() => handleClickAssigned(resource, index)}
      >
        {renderIcon(resource)}{index}
      </IconButton>
      <Typography bgcolor={'pink'}>{checkIfUserAssigned(resource.usersAssigned) ? 'true' : 'false'} </Typography>
      
    </CardActions>
  );
}
