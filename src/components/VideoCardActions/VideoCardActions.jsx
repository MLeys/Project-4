import React from 'react';
import mainTheme from "../../themes/mainTheme";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';


const TrashFilledIcon = ({color='white'}) => <i className="bi bi-trash3-fill" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;
const FileMinusOutlinedIcon = ({color='white'}) => <i className="bi bi-file-minus" color={color}/>;


export default function VideoCardActions({ resource, index }) {
  const ctx = useContext(SkillsContext);
  const userId = ctx.loggedUser._id;
  const skills = ctx.skills;

  const deleteResource = ctx.handleDeleteResource;
  const assignUserToResource = ctx.handleAssignUserToResource;
  const unAssignUserFromResource = ctx.handleUnAssignUserFromResource;
  const completeResource = ctx.handleCompleteResource;
  const handleDeleteResourcesByVideoId = ctx.handleDeleteResourcesByVideoId;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;
  const resources = ctx.skills[ctx.activeSkill,index]?.subSkills[ctx.activeSub.index].resources;

  // const [isComplete, setIsComplete] = useState(checkIfUserAssigned(resource.usersComplete));

  let isAssigned = checkIfUserAssigned(resource.usersAssigned)
  let isComplete = checkIfUserAssigned(resource.usersComplete)

  async function handleClickComplete(e) {
    const status = e.target.checked;
    console.log(e.target.checked, '--- checked status')
    completeResource(resource);    
  }

  function handleClickDeleteResource(resource) {
    deleteResource(resource);
  }

  function renderAssignIcon() {
    return isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon />;
  }

  function handleClickAssigned(resource, index) {
    isAssigned
      ? unAssignUserFromResource(resource)
      : assignUserToResource(resource);
  }

  function handleClickRemoveFromSubSkill(resource, index) {
    console.log(`Click Remove resource index: ${index}`);
  }


  return (
    <>
    <CardActions disableSpacing key={`skillCardActions-${resource._id}`}>
      {/* <IconButton
        aria-label="Remove resource from subSkill"
        onClick={() => handleClickRemoveFromSubSkill(resource, index)}
      >
        <FileMinusOutlinedIcon />
      </IconButton>
      Remove */}
      <FormControlLabel 
        control={
          <Checkbox
            checked={isComplete}
            onClick={handleClickComplete}
            disabled={isComplete}
            sx={{
              color: 'black',
              '&.Mui-checked': {
                color: 'blueTeal.dark',
              },
            }}
          />
        } 
        label="Completed" 
        sx={{display: isAssigned ? 'inline-flex' : 'none' }}
      />

    </CardActions>
    {/* <IconButton
      aria-label="Delete resource"
      disabled={true}
      onClick={() => handleClickDeleteResource(resource, index)}
    >
      <TrashFilledIcon />
      Delete from system
    </IconButton> */}
    </>

  );
}
