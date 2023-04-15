import React from "react";
import mainTheme from "../../themes/mainTheme";
import { useContext } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { TrashIcon } from "../../customIcons";


function SkillCard({skill, index}) {
  const navigate = useNavigate();
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const deleteSkill = ctx.deleteSkill;

  const handleDeleteClick = () => {
    deleteSkill(skill.id)
  };

  return ( 
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardHeader
        title={skill.name}
        action={
          <IconButton onClick={handleDeleteClick} aria-label="delete skill">
            <TrashIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="h6" component="div">
          Subskills:
        </Typography>
        <Box alignContent={'center'} justifyContent={'center'}  sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skill.subSkills.map((subSkill, index) => (
            <Chip key={index} label={subSkill.title} />
          ))}
        </Box>
      </CardContent>
    </Card>
   );
}

export default SkillCard;

const CustomCard = styled(Card)({
  width: '80%',
  height: '200px',
  margin: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: mainTheme.palette.primary.main,
  '&:hover': {
    transform: 'scale(1.15)',
  },
})

const CustomCardTitle = styled(Card)({
  backgroundColor: mainTheme.palette.secondary.dark,
  color: mainTheme.palette.secondary.contrastText,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  textAlign: 'center',
})

const CustomCardDetails = styled(Card)({
  backgroundColor: mainTheme.palette.primary.light,
  color: mainTheme.palette.secondary.contrastText,
  fontSize: '1rem',
  fontWeight: 'normal',
  marginBottom: '0.5rem',
  textAlign: 'center',
  overflow: 'auto',
  height: '70%',
})