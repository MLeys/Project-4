import React from "react";
import { useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import VideoCard from "../VideoCard/VideoCard";
import CloseButton from "../CloseButton/CloseButton";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

function SearchResultsDisplay({handleClose}) {
  const ctx = useContext(SkillsContext);
	const resources = ctx.resources;
  const youTubeResults = ctx.youTubeResults;
  const setYouTubeResults = ctx.setYouTubeResults;
  const addResource = ctx.handleAddResource;
  const skillId = ctx.activeSkillId;
  const userId = ctx.activeUserId;
  const subId = ctx.activeSubId;
  

  function handleClickAdd( resource ){
    console.log(resource, "<-resource being added onclick")
    resource.skillId = skillId;
    resource.userId = userId;
    resource.subId = subId;
    addResource(resource);
    console.log(`Add Resource: ${resource.videoId}`)
  }
  
  function handleClickRemove( resource ){
    setYouTubeResults(
      youTubeResults.filter(r => r.videoId !== resource.videoId)
    )
    console.log(`Removed from Resource list: ${resource.videoId}`)
  }


  return ( 
    <>
      <Box sx={{ flexGrow: 1 }} mb={5}>
        <CloseButton close={handleClose}/>
        <Grid container align={'center'} spacing={1} >
          
            {youTubeResults?.map((resource, index) => (
              <Grid xs={12} md={6} lg={4} key={`searchResult-${index}`}>
                <VideoCard key={`resource-${index}`} resource={resource} index={index} >
                  <Button onClick={() => handleClickAdd(resource)}>
                    Add
                  </Button>
                  <Button onClick={() => handleClickRemove(resource)}>
                    Remove
                  </Button>
                </VideoCard>
              </Grid>
            ))}   
          
        </Grid>
      </Box>
    </>
   );
}

export default SearchResultsDisplay;