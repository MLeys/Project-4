import React from "react";
import { useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";

import VideoCard from "../VideoCard/VideoCard";
import CloseButton from "../CloseButton/CloseButton";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

function SearchResultsDisplay({handleClose}) {
  const ctx = useContext(SkillsContext);
	const resources = ctx.resources;
  const youTubeResults = ctx.youTubeResults;

  return ( 
    <>
      <Box sx={{ flexGrow: 1 }} mb={5}>
        <CloseButton close={handleClose}/>
        <Grid container align={'center'} spacing={1} >
          
            {youTubeResults?.map((resource, index) => (
              <Grid xs={12} md={6} lg={4} >
                <VideoCard key={`resource-${index}`} resource={resource} index={index} />
              </Grid>
            ))}   
          
        </Grid>
      </Box>
    </>
   );
}

export default SearchResultsDisplay;