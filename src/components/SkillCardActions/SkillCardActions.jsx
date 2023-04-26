import React from 'react';
import mainTheme from "../../themes/mainTheme";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';


const TrashFilledIcon = ({color='white'}) => <i className="bi bi-trash3-fill" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;
const FileMinusOutlinedIcon = ({color='white'}) => <i className="bi bi-file-minus" color={color}/>;


export default function SkillCardActions({resource, index}) {
  const ctx = useContext(SkillsContext);
  const userId = ctx.loggedUser._id;

  const deleteResource = ctx.handleDeleteResource;
  const assignUserToResource = ctx.handleAssignUserToResource;
  const unAssignUserFromResource = ctx.handleUnAssignUserFromResource;
  const handleDeleteResourcesByVideoId = ctx.handleDeleteResourcesByVideoId;

  const [isAssigned, setIsAssigned] = useState(false)
  const [usersAssigned, setUsersAssigned] = useState([resource.usersAssigned])

  function handleClickDeleteResource(resource) {
    deleteResource(resource)
  }

  function handleCheckIfUserAssigned() {
    console.log(resource.usersAssigned, ' assigned ppl')
    setIsAssigned(resource.usersAssigned.some((u) => u === userId))
  }


  function renderIcon() {
    // console.log(isAssigned, " is assigned status for ", resource?.title)
    return isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon />;
  }

  function handleClickAssigned(resource, index) {
    isAssigned
      ? unAssignUserFromResource(resource)
      : assignUserToResource(resource);
    setIsAssigned(handleCheckIfUserAssigned())
  }

  function handleClickRemoveFromSubSkill(resource, index) {
    console.log(`Click Remove resource index: ${index}`)
  }

  useEffect(() => {
    setUsersAssigned(resource.usersAssigned)
    
  }, []); 


  useEffect(() => {
    async function checkAssigned() {
      const assigned = resource.usersAssigned.some((u) => u === userId);
      setIsAssigned(assigned);
      renderIcon(resource);
    }
    
    checkAssigned();
  }, [usersAssigned]); // Pass resource as a dependency

  // useEffect(() => {
  //   async function checkAssigned()  {
  //     const assigned =  await checkIfUserAssigned(resource.usersAssigned)
  //     setIsAssigned(assigned)
  //     renderIcon(resource)
  //   }
  //   checkAssigned()
    
  // }, [isAssigned]); 

  return ( 
    <CardActions disableSpacing>
      <IconButton 
        aria-label="Delete resource"
        onClick={() => handleClickDeleteResource(resource, index)}
      >
        <TrashFilledIcon />
      </IconButton>Delete
      <IconButton 
        aria-label="Assign user to resource"
        onClick={() => handleClickAssigned(resource, index)}
      >
        {renderIcon(resource)}
        
      </IconButton>{isAssigned ? 'unAssign' : 'Assign'}
      <IconButton 
        aria-label="Remove resource from subSkill"
        onClick={() => handleClickRemoveFromSubSkill(resource, index)}
      >
        <FileMinusOutlinedIcon />
      </IconButton>Remove

    </CardActions>
  );
}
