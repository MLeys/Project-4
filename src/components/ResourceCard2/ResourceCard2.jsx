
import React from "react";
import { useEffect, useContext, useState } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import mainTheme from "../../themes/mainTheme";
import { styled } from '@mui/material/styles';

import Link from "@mui/material/Link";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ProgressRing from "../../components/ProgressRing/ProgressRing";


const CaretDownIcon = () => <i className="bi bi-caret-down" style={{ color: 'black'}} />;
const CaretUpIcon = () => <i className="bi bi-caret-up" style={{ color: 'white'}}/>;
const BookOutlineIcon = () => <i className="bi bi-book" style={{ color: 'black'}}/>;
const BookFilledIcon = () => <i className="bi bi-book-fill" style={{ color: mainTheme.palette.blueTealLight.main}}/>;
const VertDotsIcon = () => <i className="bi bi-three-dots-vertical" style={{ color: 'white'}}/>;


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


function ResourceCard2({resource}) {
  const ctx = useContext(SkillsContext);
  const userId = ctx.loggedUser?._id;
  const skillId = skill._id;
  const isComplete = false;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    
  }, [skill]); 

  return (
    <Card 
      raised={true} 
      sx={{ 
        bgcolor: 'tealGrayLight.light', 
        display: 'flex', 
        flexDirection: 'column', 
      }} 
    >
      <CardActionArea href={`skills/${skillId}`} >
        <CardHeader
          action={
              (isComplete) ? <BookFilledIcon /> : <BookOutlineIcon />
            
          }
          title={resource.title}
          titleTypographyProps={{ variant: 'h5'}}
          subheader={resource.description}
          subheaderTypographyProps={{ varient: 'subtitle2'}}
        />
      </CardActionArea>

      <Box sx={{ flexGrow: 1 }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              Card video
            </div>
          </CardContent>
        </Collapse>
      </Box>
      <CardActions
        disableSpacing
        sx={{
          alignSelf: 'center',
          bgcolor: 'tealGray.main',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          m: 0,
        }}
      >
        <Typography>Learning X of X Subskills</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CaretDownIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}

export default ResourceCard2;
