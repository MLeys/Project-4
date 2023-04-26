import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import '../../components/WelcomingText/WelcomingText.css'

import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { initialSkillsList } from "../../lists/skillTypes";

import CreateSkillDialog from "../../components/CreateSkillDialog/CreateSkillDialog";
import DisplaySkills from "../../components/DisplaySkills/DisplaySkills";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

function LandingPage() {
  const navigate = useNavigate();
  const ctx = useContext(SkillsContext);
  const user = ctx.loggedUser;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const createInitialSkillsFromList = ctx.handleCreateInitialSkillsFromList;
  const [openDialog, setOpenDialog] = useState(false);

  async function handleClickCreateInitialSkillsFromList(){
    console.log(initialSkillsList, 'Initial skills list')
    // const skillsList = []
    // initialSkillsList.map((skill) => {
    //   const skillData = [{
    //     title: skill.category,
    //     type: skill.category
    //   }]
    //   skillsList.push(skillData)

    // })
    createInitialSkillsFromList(initialSkillsList)
    // console.log(initialSkills, '-- initial skills')
    // console.log(skillsList, ' --- create skills')

  }
  


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const isNewUser = localStorage.getItem('isNewUser');

    if (isNewUser === null) {
      navigate('/onboarding');
      localStorage.setItem('isNewUser', false);
    }
  }, [history]);

  return (
    <>
      <Button color="secondary" contextMenu="Test" onClick={() => navigate('/onboarding')} >
        Onboarding
      </Button>
      <Button color="warning" onClick={handleClickCreateInitialSkillsFromList}>Create Initial skills</Button>
      <WelcomeSection />

      <section style={{height: '5dvh', width: '100dvw', paddingTop: 10, display: 'flex', justifyContent: 'center'}}>
        <Button  onClick={handleOpenDialog} color="primary">
        Create Skill
        </Button>
        <CreateSkillDialog
          open={openDialog}
          onClose={handleCloseDialog}
        />
       
      </section>

      <Grid xs={12} px={2} >
        <DisplaySkills />
      </Grid>
    </>
  );
}

export default LandingPage;