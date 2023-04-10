import * as React from 'react';
import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { lightGreen, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import DeleteButton from '../DeleteButton/DeleteButton';


function VideoCard({resource, index}) {
  const theme = useTheme();
	const ctx = useContext(SkillsContext);
  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;

  function ResourceVideo() {
    return (
      <iframe
        width='100%'
        src={`https://www.youtube.com/embed/${resource.videoId}`}
        allowFullScreen={true}
        allow='autoplay; encrypted-media'
        title='video'
      /> 
    )
  }
  

  return (

    <Card sx={{ height: '350px', m: 0, p: 0}}  >
      <CardContent sx={{ mt: 1, pt: 1, mb: 0, pb: 0}}>
        <Box ml={0} sx={{ display: 'flex', alignItems: 'center' }}>            
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {resource.title}
          </Typography>
          <Box m={0} p={0} position='relative'>
            <CardActions >
              <IconButton aria-label="add-edit-delete" sx={{ position: 'absolute', top: -35, right: -20}}>
                <DeleteButton children={MoreVertIcon} id={resource._id}/>
                {/* <MoreVertIcon /> */}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Typography variant="body1" color="secondary.contrastText" >
          {resource.description}
        </Typography>
        <ResourceVideo />
      </CardContent>
    </Card>

  );
}

export default VideoCard;