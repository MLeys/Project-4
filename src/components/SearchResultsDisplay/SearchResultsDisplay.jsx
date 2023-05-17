import React from "react";
import { useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import VideoCardExpand from "../VideoCardExpand/VideoCardExpand";
import VideoCard2 from "../VideoCardExpand/VideoCardExpand";
import VideoCard from "../VideoCard/VideoCard";
import CloseButton from "../CloseButton/CloseButton";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

function SearchResultsDisplay({handleClose}) {
  const ctx = useContext(SkillsContext);
	const resources = ctx.resources;
  const youTubeResults = ctx.youTubeResults;
  const setYouTubeResults = ctx.setYouTubeResults;
  const createResource = ctx.handleCreateResource;

  const skillId = ctx.activeSkillId;
  const userId = ctx.activeUserId;
  const subId = ctx.activeSubId;
  

  async function handleClickCreate( resource ){   
    resource.skillId = skillId;
    resource.userId = userId;
    resource.subId = subId;
    await createResource(resource);
    handleClickRemove(resource)
    console.log(`Added ${resource.title} to ${subId}`)
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
              <Grid xs={12} key={`searchResult-${index}`}>
                <VideoCardExpand key={`resource-${index}`} resource={resource} index={index} >
                  <Button color="success" variant="contained" onClick={() => handleClickCreate(resource)}>
                    Add
                  </Button>
                  <Button color="error" variant="contained" onClick={() => handleClickRemove(resource)}>
                    Remove
                  </Button>
                </VideoCardExpand>
              </Grid>
            ))}   
          
        </Grid>
      </Box>
    </>
   );
}

export default SearchResultsDisplay;