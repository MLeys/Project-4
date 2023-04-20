
import React from "react";
import { useEffect, useContext, useState } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import mainTheme from "../../themes/mainTheme";
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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

  const isComplete = false;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;

  const createdAt = resource.formattedCreatedAt;

  function ResourceVideo() {
    return (
      <iframe
        style={{
          maxWidth: '98%',
          width: 'auto',
          height: '100%',
          margin: 0,
          padding: 0,
        }}
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen={true}
        allow='autoplay; encrypted-media'
        title='video'
      /> 
    )
  }
  

  return (
    <Card 
      raised={true} 
      sx={{ 
        bgcolor: 'tealLight.light', 
        display: 'flex', 
        flexDirection: 'column', 
        m: 0,
        p: 0,
      }} 
    >
      <CardActionArea href='#'>
        <CardHeader
          action={
            (isComplete) ? <BookFilledIcon /> : <BookOutlineIcon />
          }
          title={resource.title}
          titleTypographyProps={{pr:1,p: 0, m: 0, variant: 'h6', color: 'black', }}
          subheader={resource.description}
          subheaderTypographyProps={{ varient: 'subtitle2', color: 'black', fontSize: '.75rem'}}
        />
      </CardActionArea>

      <Box sx={{ flexGrow: 1 }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <ResourceVideo />
            </div>
          </CardContent>
        </Collapse>
      </Box>
      <CardActions
        sx={{
          m: 0, p: 0, pb: 1,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Box 
          component={Button}
          p={1}
          pr={3}
          m={0}
          py={0} 
          bgcolor={'blueGray.dark'} 
          onClick={handleExpandClick}
          sx={{ 
            borderRadius: 10,
            '&:hover': {
              bgcolor: 'primary.main'
            }
          
          }}
        >
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="watch video"
          >
            <CaretUpIcon />
          </ExpandMore>
          <Typography color={'white'}>
            <strong>Watch</strong>
          </Typography>
        </Box>

      </CardActions>
    </Card>
  );
}

export default ResourceCard2;
