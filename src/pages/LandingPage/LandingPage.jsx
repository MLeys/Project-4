import {  useState, useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import '../../components/WelcomingText/WelcomingText.css'

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CreateSkillDialog from "../../components/CreateSkillDialog/CreateSkillDialog";
import DisplaySkills from "../../components/DisplaySkills/DisplaySkills";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

function LandingPage() {
  const ctx = useContext(SkillsContext);

  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const [openDialog, setOpenDialog] = useState(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
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