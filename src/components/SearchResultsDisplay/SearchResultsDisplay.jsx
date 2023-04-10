import React from "react";
import { useState, useEffect, useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

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
        <Grid container align={'center'} spacing={2} >
          
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