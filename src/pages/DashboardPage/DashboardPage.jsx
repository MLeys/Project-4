import React from "react";
import { useEffect, useContext, useState } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ProgressRing from "../../components/ProgressRing/ProgressRing";

const CaretDownIcon = () => <i className="bi bi-caret-down"></i>;
const CaretUpIcon = () => <i className="bi bi-caret-up"></i>;
const BookOutlineIcon = () => <i className="bi bi-book"></i>;
const BookFilledIcon = () => <i className="bi bi-book-fill"></i>;
const VertDotsIcon = () => <i className="bi bi-three-dots-vertical"></i>;


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const handleSetActiveSkill = ctx.handleSetActiveSkill;0
  const userId = ctx.loggedUser._id;
  const skills = ctx.skills;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  useEffect(() => {
 
  }, []); 

  return (
    <Grid>
      <h1> users dashboard</h1>
      <Card raised={true} sx={{ maxWidth: 345, bgcolor: 'tealGray.main' }} >
      <CardHeader
        avatar={
          <ProgressRing value={50} sx={{ bgcolor: 'teal2.light', color: 'black' }} aria-label="recipe">
            15%
          </ProgressRing>
        }
        action={
          <IconButton aria-label="Learn">
            <BookOutlineIcon />
          </IconButton>
        }
        title="Skill Name"
        subheader="f16"
      />
    

        <CardActions disableSpacing >
          <Typography>
            Learning X of X 
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CaretDownIcon />
          </ExpandMore>
        </CardActions>
        
  
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>SubSkills Listed here as small cards themselves:</Typography>
          <Typography paragraph>
            Each be clicked and assigned to const [state, dispatch] = useReducer(first, second, third)
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
      
   
    </Grid>
  );
}

export default DashboardPage;
