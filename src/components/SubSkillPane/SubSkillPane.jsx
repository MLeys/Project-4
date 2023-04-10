import { useState, useEffect, useContext } from "react";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'

import VideoCard from "../VideoCard/VideoCard";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import AddResourceDisplay from "../AddResourceDisplay/AddResourceDisplay";
import ResourceDisplay from "../ResourceDisplay/ResourceDisplay"

function SubSkillPane() {
	const ctx = useContext(SkillsContext);
	const subCtx = ctx.activeSub;
	const subSkill = ctx.activeSub?.subSkill;
	const resources = ctx.activeSub?.subSkill?.resources;
	const activeSkill = ctx.activeSkill?.skill.name;
	

	useEffect(() => {

	}, [])

	return (

    <Box minHeight='90dvh' component={Paper} elevation={6} >
      <Grid container component={Paper} elevation={12} bgcolor={"primaryDarker.main"} minHeight='80dvh' spacing={2} mt={2} xs={12}>
				{resources?.map((resource, index) => (
					<Grid xs={12} sm={6} lg={4} >
						<VideoCard key={`resource-${index}`} resource={resource} index={index} />
					</Grid>
				))}   
      </Grid>
    </Box>
	)
}
export default SubSkillPane;