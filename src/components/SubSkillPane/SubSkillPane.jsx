import { useState, useEffect, useContext } from "react";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'

import VideoCard from "../VideoCard/VideoCard";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";




function SubSkillPane() {
	const ctx = useContext(SkillsContext);
	const subCtx = ctx.activeSub;
	const subSkill = ctx.activeSub?.subSkill;
	const resources = ctx.activeSub?.subSkill?.resources;
	const activeSkill = ctx.activeSkill?.skill.name;
	

	useEffect(() => {

	}, [])

	return (
		<><Grid container spacing={1}>
			
			
				{resources?.map((resource, index) => (
					<Grid xs={12} sm={6} lg={4} >
						<VideoCard key={`resource-${index}`} resource={resource} index={index} />
					</Grid>
				))}   
				
		</Grid>

		</>


    

	)
}
export default SubSkillPane;