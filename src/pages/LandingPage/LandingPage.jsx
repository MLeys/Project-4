import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import mainTheme from "../../themes/mainTheme";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import CreateSkillDialog from "../../components/CreateSkillDialog/CreateSkillDialog";

import DisplaySkills from "../../components/DisplaySkills/DisplaySkills";

function LandingPage() {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const [openDialog, setOpenDialog] = useState(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {

    
  }, []); 

  return (
    <Grid container={true} spacing={1} backgroundColor={mainTheme.palette.primaryDarker.main} >
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
    </Grid>
  );
}

export default LandingPage;