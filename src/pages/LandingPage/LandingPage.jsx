import { useEffect, useState, useContext } from "react";
import mainTheme from "../../themes/mainTheme";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/system";


import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import CreateSkillModal from "../../components/CreateSkillModal/CreateSkillModal";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


const CustomCard = styled(Card)({
  width: '300px',
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
  backgroundColor: mainTheme.palette.primary.dark,
  color: mainTheme.palette.primary.contrastText,
  
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  textAlign: 'center',

  
})

const CustomCardDetails = styled(Card)({
  backgroundColor: mainTheme.palette.accent.dark,
  color: mainTheme.palette.accent.contrastText,
  fontSize: '1rem',
  fontWeight: 'normal',
  marginBottom: '0.5rem',
  textAlign: 'center',
  overflow: 'auto',
  maxHeight: '70%',
})


function LandingPage() {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSkill = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {

    }, []); 
  return (
    <Grid container={true} spacing={1} backgroundColor='primary.light' >
          <section style={{height: '5dvh', width: '100dvw', paddingTop: 10, display: 'flex', justifyContent: 'center'}}>
      <Button variant="contained" color="primary" onClick={handleCreateSkill}>
        Create a New Skill
      </Button>
      <CreateSkillModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
            {skills?.map(skill => (
        <Grid item={true} display="flex" justifyContent="center" alignItems="center" xs={12} sm={6} md={4} lg={3} key={skill.id}>
        <CustomCard  onClick={() => console.log(`Clicked on ${skill.name} card`)}>
          <CustomCardDetails >
            <CustomCardTitle variant="h6" component="h3" >
              {skill.name}
              <Typography variant="subtitle2" color="textSecondary" >
              Type: {skill.type}
              </Typography>
            </CustomCardTitle>

          </CustomCardDetails>
          <CustomCardDetails>
            {skill.subSkills.map(sub => (
              <Typography>{sub.title}</Typography>
            ))}
          </CustomCardDetails>
        </CustomCard>
      </Grid>
      ))}

    </Grid>
  );
}

export default LandingPage;