import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import OptionsButton from '../OptionsButton/OptionsButton';
import { grey } from '@mui/material/colors';

const VideoCard = React.memo(function VideoCard({ resource, children }) {  
  const theme = useTheme();
	const ctx = useContext(SkillsContext);
  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;

  const createdAt = resource.formattedCreatedAt;
  
  return (
    <Card 
      sx={{ 
        flexGrow: 1,
        position: 'relative', 
        maxWidth: '330px',
        minWidth: '290px',
        px: .5,
        backgroundColor: grey[100],
        color: 'blueGrayLight2.contrastText'
      }} 
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ fontSize: 14, fontWeight: 600, color: 'inherit'}}
        subheader={description}
        subheaderTypographyProps={{ fontSize: 10, fontWeight: 200, color: 'inherit' }}
      />
      <CardMedia
        component={"iframe"}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow='autoplay, encrypted-media'
        allowFullScreen ={true}
      />
      <CardContent sx={{width: '100%', p: 0, m: 0,}} >
        {children}
      </CardContent>
    </Card>

  );
});

export default VideoCard;