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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';


function VideoCard({resource, index}) {
  const theme = useTheme();
	const ctx = useContext(SkillsContext);
  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;

  function ResourceVideo() {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${resource.videoId}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
      /> 
    )
  }

  return (
    <Box component={Paper} elevation={16}>
      <Card >
        <CardContent sx={{my: .5, p: 0, maxWidth: '100%'}}>
          <Box ml={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>            
            <Typography variant="h5" component="div" sx={{ fontWeight: 900 }}>
              {resource.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CardActions sx={{ alignSelf: 'flex-start', pr: 0 , mt: 0, pb: 5}}>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
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

    </Box>

  );
}

export default VideoCard;