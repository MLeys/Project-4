
import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import mainTheme from "../../themes/mainTheme";
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import ProgressRing from "../../components/ProgressRing/ProgressRing";
import RemoveSkillDialog from "../RemoveSkillDialog/RemoveSkillDialog";


const CaretDownIcon = () => <i className="bi bi-caret-down" style={{ color: 'black'}} />;
const CaretUpIcon = () => <i className="bi bi-caret-up" style={{ color: 'white'}}/>;
const BookOutlinedIcon = () => <i className="bi bi-book" style={{ color: 'black'}}/>;
const BookFilledIcon = () => <i className="bi bi-book-fill" style={{ color: mainTheme.palette.blueTealLight.main}}/>;
const VertDotsIcon = () => <i className="bi bi-three-dots-vertical" style={{ color: 'white'}}/>;
const PlusSquareIcon = () => <i className="bi bi-plus-square" style={{ color: 'white'}}/>;
const PlusSquareFilledIcon = () => <i className="bi bi-plus-square-fill" style={{ color: 'white'}}/>;

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
  const navigate = useNavigate();
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const userId = ctx.loggedUser?._id;
  const skillId = skill._id;
  const setActiveSkillById = ctx.handleSetActiveSkillById;
  const assignSkill = ctx.handleAssignUserToSkill;
  const unAssignSkill = ctx.handleUnAssignUserFromSkill;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;
  const usersAssigned = skill?.usersAssigned;
  const isAssigned = checkIfUserAssigned(usersAssigned)
  const progressData = ctx.progressData;

  const skillProgressData = progressData?.find((data) => data.skillId === skill._id);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(skillProgressData?.totalSubSkillsAssigned, "<-- skill progress data")

  function handleClickAssignIcon(e, skill) {
    e.stopPropagation();

    if (isAssigned) {
      unAssignSkill(skill)
    } else {
      assignSkill(skill)
    }
  }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleClickOpenRemoveSkillDialog(e) {
    e.stopPropagation();
    setOpenRemoveDialog(true);
    setIsDialogOpen(true); // Set isDialogOpen to true when the dialog is opened
  }
  
  // Modify handleClickSkillCard to only navigate if the dialog is not open
  function handleClickSkillCard(e) {
    e.stopPropagation();
    if (!isDialogOpen) {
      setActiveSkillById(skillId);
      navigate(`../skills/${skillId}`);
    }
  }
  
  // Modify setOpenRemoveDialog to set isDialogOpen to false when the dialog is closed
  function handleCloseRemoveDialog() {
    setOpenRemoveDialog(false);
    setIsDialogOpen(false); // Set isDialogOpen to false when the dialog is closed
  }


  return (
    <Card 
      raised={true} 
      sx={{ 
        width: '100%',
        bgcolor: 'tealGrayLight.light', 
        display: 'flex', 
        flexDirection: 'column', 
      }} 
    >
      <CardActionArea  >
        <CardHeader
          onClick={(e) => handleClickSkillCard(e)} 
          avatar={ 
            (userId) ?  <ProgressRing value={skillProgressData ? skillProgressData?.progress : 0} aria-label="skill-progress" /> : <VertDotsIcon />
          }
          action={
            <Box mx={1}>
              <RemoveSkillDialog skill={skill} setOpen={setOpenRemoveDialog} open={openRemoveDialog} handleClose={handleCloseRemoveDialog} >
                <IconButton
                  edge="end"
                  onClick={(e) => handleClickOpenRemoveSkillDialog(e)}
                >
                  {isAssigned ? <BookFilledIcon /> : <BookOutlinedIcon /> }                 
                </IconButton>
              </RemoveSkillDialog>

            </Box>

          }
          title={skill.name}
          titleTypographyProps={{ variant: 'h5'}}
        >
        
        </CardHeader>
      </CardActionArea>

      <Box sx={{ flexGrow: 1 }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
            {skill?.subSkills?.map((sub, index) => (
              <li key={`subListItem-${index}`}>{sub.title} - {index}</li>
            ))}
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
        <Stack>
        <Typography ml={1} align="left" >{`Learning ${skillProgressData?.totalSubSkillsAssigned} of ${skill?.subSkills?.length} Subskills`}</Typography>
        <Typography ml={1} align="left">{`Completed ${skillProgressData?.totalResourcesComplete
                                  ? skillProgressData?.totalResourcesComplete
                                  : 0
                      } of ${skillProgressData?.totalResourcesAssigned} Resources`}
        </Typography>
        

        </Stack>
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
