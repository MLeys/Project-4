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

import VideoCardActions from '../../components/VideoCardActions/VideoCardActions';
import VideoCard from "../../components/VideoCard/VideoCard";
import PageDrawer from "../../components/SubSkillDrawer/SubSkillDrawer";
import SubTable from '../../components/SubTable/SubTable';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel/LinearProgressWithLabel';
import ResourceCard2 from '../../components/ResourceCard2/ResourceCard2';
import SearchForm from '../../components/SearchForm/SearchForm';

const TrashFilledIcon = ({color='white'}) => <i className="bi bi-trash3-fill" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;


function SkillPage() {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const progressData = ctx.progressData;
  const userId = ctx.loggedUser._id;
  const setActiveSkillById = ctx.handleSetActiveSkillById;
  const serverResources = ctx.resources
  const activeSkill = ctx.activeSkill;
  const activeSub = ctx.activeSub;
  const skillId = useParams().skillId;
  const skillIndex = skills?.findIndex((s) => s._id === skillId)
  const subSkills = ctx.activeSubSkills;
  const subIndex = subSkills?.findIndex((sub) => sub._id === activeSub?.subSkill._id)
  const subId = subSkills?.[subIndex]?._id;
  const resources = ctx.skills[skillIndex]?.subSkills[subIndex]?.resources;
  // const resources = ctx.resources.filter((r) => r.subSkillId === subId);

  const usersSubSkills = subSkills?.filter((sub) => sub.usersAssigned.some((u) => u._id === userId))
  const usersResources = resources?.filter((res) => res.usersAssigned.some((u) => u === userId))
  const usersResourcesComplete = usersResources?.filter((res) => res.usersComplete.some((u) => u === userId))

  console.log(progressData, "<-- progress data")
  const skillProgressData = progressData?.find((data) => data.skillId === skillId)
  console.log(skillProgressData, "<--- skill pages progress data")

  const totalUserSubs = usersSubSkills?.length;
  const totalSubs = subSkills?.length;
  const totalSkillProgress = totalUserSubs/ totalSubs
  const totalResources = resources?.length;
  const totalUserResources = usersResources?.length;
  const totalSubProgress = totalUserResources/ totalResources * 100;


  function calcSubProgressValue(sub) {
    const subResourcesAssigned = sub?.resources.filter((res) => res.usersAssigned.some((u) => u === userId))
    const subResourcesComplete = subResourcesAssigned?.filter((res) => res.usersComplete.some((u) => u === userId))

    const value = subResourcesComplete > 0 ? subResourcesComplete / subResourcesAssigned * 100 : 0;
    return value;
  }


  useEffect(() => {
    setActiveSkillById(skillId)

    
  }, [!activeSkill, skills]); 

  if (!progressData) {
    console.log(ctx)
    return <div> loading...</div>
  } else {
    console.log(skillProgressData)
  }

  return ( 
    <PageDrawer >
      <Typography>Progress for skill: {skillProgressData?.progress}</Typography>
      <Box 
        mr={2.5}
        ml={1}
        flexWrap={'wrap'}
      >
        <Grid 
          container
          display={'flex'}
          width={'100%'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Grid xs={12} sm={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            {/* Change to only show users currently assigned  */}
            <Card sx={{ bgcolor: 'blueGrayLight2.light', my: 1, pl: 1, minWidth: 280, maxWidth: 350, textAlign: 'left'}}>
              {usersSubSkills?.map((sub, index) => (
                <Box key={`subProg-${sub._id}`} >
                  <LinearProgressWithLabel height={10} key={`subProg-${index}`} title={sub.title} value={calcSubProgressValue(sub)} />
                  <Divider />
                </Box>
              ))}     
            </Card>
          </Grid>
          <Grid xs={12} sm={6} bgcolor={'transparent'}>
            <SearchForm />
          </Grid>
        </Grid>

        <Grid container spacing={1}  flexGrow={1}>
          <Grid xs={12} my={1} component={Card} bgcolor={'blueGray.main'} color={'white'} elevation={12} mx={0} p={0}>      
            <Typography variant="h4" component="h4"  p={0}>
              {activeSub?.subSkill?.title}
            </Typography>
          </Grid>
          {resources?.map((resource, index) => (
            <Grid key={`resourceCard-${index}`} xs={12} sm={6} md={4}>
              <VideoCard key={`resourceCard-${index}`} resource={resource} index={index} >
                <VideoCardActions resource={resource} index={index} />
              </VideoCard>
            </Grid>
      ))}
        </Grid>
      </Box>
    </PageDrawer>

  );
}
export default SkillPage;