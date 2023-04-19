
import React from "react";
import { useEffect } from "react";



import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ProgressRing from "../../components/ProgressRing/ProgressRing";

const CaretDownIcon = () => <i className="bi bi-caret-down" style={{ color: 'black'}} />;
const CaretUpIcon = () => <i className="bi bi-caret-up" style={{ color: 'white'}}/>;
const BookOutlineIcon = () => <i className="bi bi-book" style={{ color: 'black'}}/>;
const BookFilledIcon = () => <i className="bi bi-book-fill" style={{ color: 'white'}}/>;
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


function SkillCard3({skill}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
 
  }, []); 

  return (
      <Card 
        raised={true} 
        sx={{ 
          maxWidth: 345, 
          bgcolor: 'tealGrayLight.light', 
          // color: 'blueTeal.contrastText' ,
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
        }} 
      >
      <CardHeader
        avatar={ 
          <ProgressRing value={50} aria-label="skill-progress" /> 
        }
        action={
          <IconButton aria-label="Learn">
            <BookOutlineIcon />
          </IconButton>
        }
        title={skill.name}
        titleTypographyProps={{ variant: 'h5'}}
      />


  <Box sx={{ flexGrow: 1 }}>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>SubSkills Listed here as small cards themselves:</Typography>
        <Typography paragraph>
          Each be clicked and assigned to const [state, dispatch] = useReducer(first, second, third)
        </Typography>
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

export default SkillCard3;
