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

import VideoCard from "../../components/VideoCard/VideoCard";
import PageDrawer from "../../components/PageDrawer/PageDrawer";
import SubTable from '../../components/SubTable/SubTable';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel/LinearProgressWithLabel';
import ResourceCard2 from '../../components/ResourceCard2/ResourceCard2';
import SearchForm from '../../components/SearchForm/SearchForm';

const TrashFilledIcon = ({color='white'}) => <i className="bi bi-trash3-fill" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;


function SkillPage() {
  const ctx = useContext(SkillsContext);
  const getSkills = ctx.getSkills;
  const skills = ctx.skills;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;
  const activeSkill = ctx.activeSkill;
  const activeSub = ctx.activeSub;
  const subId = ctx.activeSub?._id;
  const skillId = useParams().skillId;
  const pageSkill = skillId ? skills?.find(skill => skill?._id === skillId) : console.log('skill param not found');
  const activeSubIndex = ctx.activeSub?.index;
  const activeSubSkills = ctx.activeSkill?.subSkills ? ctx.activeSkill?.subSkills : console.log(' Unable to store subskills')
  const userId = ctx.loggedUser?._id;
  const deleteResource = ctx.handleDeleteResource;
  const assignResource = ctx.handleAssignResourceUser;
  const unAssignResource = ctx.handleUnAssignResourceUser;
  const deleteResourcesByVideoId = ctx.handleDeleteResourcesByVideoId;

  const [skill, setSkill] = useState(pageSkill);
  const [subSkills, setSubSkills] = useState([]);
  const [isAssigned, setIsAssign] = useState(false)
  
  function handleDeleteResource(resource) {
    deleteResource(resource)
  }



  function checkAssigned(resource) {
    const isAssigned = resource.usersAssigned.some((u)=> u._id === userId)
    setIsAssign(isAssigned)
  }


  function handleClickAssigned(resource) {
    const resourceId = resource._id;
    (isAssigned) 
      ? unAssignResource(skillId, subId, resourceId, userId)
      : assignResource(skillId, subId, resourceId, userId); 
  }

  function handleClickDeleteAllByVideoId() {
    console.log('Clicked Delete all videos by VideoId')
    deleteResourcesByVideoId();
  }

  useEffect(() => {
    
    if ( skills) { 
      handleSetActiveSkillById(skillId)
      setSkill(skills?.find(skill => skill?._id === skillId)) 
      setSubSkills(skills?.find(skill => skill?._id === skillId)?.subSkills)
    }
    
  }, [skills, subSkills]); 

  return ( 
   
    <PageDrawer >
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
          <Button onClick={() => handleClickDeleteAllByVideoId()}>
            Delete All by Video Id
          </Button>

          <Grid xs={12} sm={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            {/* Change to only show users currently assigned  */}
            <Card sx={{ bgcolor: 'blueGrayLight2.light', my: 1, pl: 1, minWidth: 280, maxWidth: 350, textAlign: 'left'}}>
              {subSkills?.map((sub, index) => (
                <Box key={`subProg-${index}`} >
                  <LinearProgressWithLabel height={10} key={`subProg-${index}`} title={sub.title} value={35} />
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
          {activeSub?.resources?.map((resource, index) => (
          <Grid key={`resourceCard-${index}`} xs={12} sm={6} md={4}>
            <VideoCard key={`resourceCard-${index}`} resource={resource} >
              <CardActions disableSpacing>
                <IconButton 
                  aria-label="Delete resource"
                  onClick={() => handleDeleteResource(resource)}
                >
                  <TrashFilledIcon />
                </IconButton>
                <IconButton 
                  aria-label="Delete resource"
                  onClick={() => handleClickAssigned(resource)}
                >
                  {isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon />}
                </IconButton>
                
              </CardActions>
            </VideoCard>
          </Grid>
          ))}
        </Grid>
      </Box>
    </PageDrawer>

  );
}
export default SkillPage;