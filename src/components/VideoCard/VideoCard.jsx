import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import OptionsButton from '../OptionsButton/OptionsButton';

function VideoCard({resource, index, children}) {
  const theme = useTheme();
	const ctx = useContext(SkillsContext);

  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;

  const createdAt = resource.formattedCreatedAt;
  

  function ResourceVideo() {
    return (
      <iframe
        width='256px'
        height='144px'
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen={true}
        allow='autoplay; encrypted-media'
        title='video'
      /> 
    )
  }
  

  useEffect(() => {

    
  }, []); 

  return (

    <Card sx={{ position: 'relative', minWidth: '260px', maxWidth: '350px',minHeight: '375px' , m: 0, p: 0}} >
      <CardActions 
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 0,
          m: 0,
        }}
      >
        <OptionsButton />
      </CardActions>
      <CardContent sx={{ mt: 1, pt: 1, mb: 0, pb: 0}}>
        <Box ml={0} height='80px' mb={1} sx={{ display: 'flex', alignItems: 'center' }}>            
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {title}
          </Typography>
        </Box>
        <Box height='60px'  sx={{overflow: 'auto'}} >
        <Typography whiteSpace='normal' variant="subtitle2" color="secondary.contrastText">            {resource.description}
          </Typography>
        </Box>
        <Box m={0} mt={2} >
          <ResourceVideo />
        </Box>
      </CardContent>

        <Typography alignContent={'flex-end'}>Added: {createdAt}</Typography>

    </Card>

  );
}

export default VideoCard;