import * as React from 'react';
import './VideoCardExpand.css'
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';


import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import OptionsButton from '../OptionsButton/OptionsButton';
import { grey } from '@mui/material/colors';

const CaretDownIcon = () => <i className="bi bi-caret-down" style={{ color: 'black'}} />;
const ThreeDotsVertIcon = ({color='white'}) => <i className="bi bi-three-dots-vertical" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;

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


const VideoCardExpand = React.memo(function VideoCard({ resource, children, index }) {  
  const theme = useTheme();
	const ctx = useContext(SkillsContext);
  const checkIfUserAssigned = ctx.checkIfUserAssigned;


  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;
  let isAssigned = checkIfUserAssigned(resource.usersAssigned)

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card 
      sx={{ 
        flexGrow: 1,
        position: 'relative', 
        maxWidth: '330px',
        minWidth: '290px',
        px: .5,
        py: 0,
        m: 0,
        backgroundColor: 'blueGrayLight2.light',
        color: 'blueGrayLight2.contrastText'
      }} 
    >

      <CardHeader
        className='cardHeader'
        title={title}
        titleTypographyProps={{ 
          className: 'twoLinesText',
          fontSize: 16, 
          fontWeight: 400, 
          color: 'inherit',
          pr: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          
          // whiteSpace: 'nowrap',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
          // maxWidth: '5ch'
        }}
        // subheader={description}
        // subheaderTypographyProps={{ 
        //   classeName: 'twoLinesText',
        //   fontSize: 10, 
        //   fontWeight: 200, 
        //   color: 'inherit' 
        // }}
      />

      <CardActions disableSpacing>
        {children}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CaretDownIcon />
        </ExpandMore>
      </CardActions>


      <Box sx={{ flexGrow: 1 }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* <Typography variant='h6'>
            {title}
          </Typography> */}
          <Typography variant='body2' overflow='visibles'>
            {description}
          </Typography>
          <CardMedia
            component={"iframe"}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow='autoplay, encrypted-media'
            allowFullScreen ={true}
          />
        </Collapse>
      </Box>
    </Card>

  );
});

export default VideoCardExpand;