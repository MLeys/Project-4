import * as React from 'react';
import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <Box width='100%'>
      <Card >
        <CardContent>
          <CardHeader
            sx={{m: 0, p: 0, maxWidth: '100%'}}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={resource.title}
            subheader={resource.description}
            titleTypographyProps={{ fontWeight: 900, m: 0, p: 0, alignContent: 'center', maxWidth: '100%'}}
          />
          <ResourceVideo />
        </CardContent>
      </Card>

    </Box>

  );
}

export default VideoCard;