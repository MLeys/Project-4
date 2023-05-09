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

const ThreeDotsVertIcon = ({color='white'}) => <i className="bi bi-three-dots-vertical" color={color}/>;
const BookFilledIcon = ({color='white'}) => <i className="bi bi-book-fill" color={color}/>;
const BookOutlinedIcon = ({color='white'}) => <i className="bi bi-book" color={color}/>;

const VideoCard = React.memo(function VideoCard({ resource, children, index }) {  
  const theme = useTheme();
	const ctx = useContext(SkillsContext);
  const assignUserToResource = ctx.handleAssignUserToResource;
  const unAssignUserFromResource = ctx.handleUnAssignUserFromResource;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;


  const {title, videoId, description, thumbnail, datePublished, skillId, subSkillId } = resource;
  let isAssigned = checkIfUserAssigned(resource.usersAssigned)


  function renderAssignIcon() {
    return isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon />;
  }

  function handleClickAssigned(resource, index) {
    isAssigned
      ? unAssignUserFromResource(resource)
      : assignUserToResource(resource);
  }
  
  
  return (
    <Card 
      sx={{ 
        flexGrow: 1,
        position: 'relative', 
        maxWidth: '330px',
        minWidth: '290px',
        px: .5,
        py: 0,
        backgroundColor: 'blueGrayLight2.light',
        color: 'blueGrayLight2.contrastText'
      }} 
    >

      <CardHeader
        title={title}
        titleTypographyProps={{ fontSize: 14, fontWeight: 600, color: 'inherit'}}
        subheader={description}
        subheaderTypographyProps={{ fontSize: 10, fontWeight: 200, color: 'inherit' }}
        action={
          <IconButton
            aria-label="Assign user to resource"
            onClick={() => handleClickAssigned(resource, index)}
          >
            {renderAssignIcon(resource)}
          </IconButton>
        }
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