import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Step,
  StepLabel,
  Stepper,
  FormControlLabel,
  Checkbox,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Input,
  InputLabel

} from '@mui/material';



const AddCircleOutline = () => <i className="bi bi-plus-circle"></i>;
const Close = () => <i className="bi bi-x"></i>;

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';


export default function OnboardingPage() {
  const ctx = useContext(SkillsContext);
  const skillList = ctx.skills;
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [skills, setSkills] = useState(ctx.skills);
  const [subskills, setSubskills] = useState([]);
  const [openAddSkillDialog, setOpenAddSkillDialog] = useState(false);
  const [customSkill, setCustomSkill] = useState({ name: '', subskills: [] });
  const navigate = useNavigate();

  // Simulated list of skills and subskills
  // const skillList = [
  //   { id: 1, name: 'Skill 1', subskills: ['Subskill 1.1', 'Subskill 1.2'] },
  //   { id: 2, name: 'Skill 2', subskills: ['Subskill 2.1', 'Subskill 2.2'] },
  // ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Button variant="outlined" component="span">
                Upload Profile Image
              </Button>
            </label>
            {profileImage && (
              <Avatar src={URL.createObjectURL(profileImage)} sx={{ ml: 1 }} />
            )}
          </>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            {skillList?.map((skill, index) => (
              <Grid item key={skill._id} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={skills.includes(skill)}
                      onChange={(e) => handleSkillSelection(e, skill)}
                      color="primary"
                      sx={{
                        backgroundColor: 'transparent' ,
                        color: 'black',
                        '&:hover': {
                          backgroundColor: 'tealLight.main',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'blueTealGray.light',
                          '&:hover': {
                            backgroundColor: 'tealLight.light',
                          },
                        },
                        
                      }}
                    />
                  }
                  label={`${skill.name}`}
                />
                {skill?.subskills?.map((subskill) => (
                    <FormControlLabel
                      key={subskill._id}
                      control={
                        <Checkbox
                          checked={subskills.includes(subskill)}
                          onChange={(e) => handleSubskillSelection(e, subskill)}
                          color="primary"
                        />
                      }
                      label={subskill}
                      sx={{ ml: 3 }}
                    />
                  ))}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                startIcon={<AddCircleOutline />}
                onClick={() => setOpenAddSkillDialog(true)}
              >
                Add Custom Skill
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Typography variant="h6" align="center">
            Congratulations! You're all set to start your learning journey.
            </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      // Complete the onboarding process and navigate to the dashboard
      // TEMP TO LANDING
      navigate('/');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkillSelection = (event, skill) => {
    if (event.target.checked) {
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter((s) => s !== skill));
      setSubskills(subskills.filter((subskill) => !skill.subskills.includes(subskill)));
    }
  };

  const handleSubskillSelection = (event, subskill) => {
    if (event.target.checked) {
      setSubskills([...subskills, subskill]);
    } else {
      setSubskills(subskills.filter((s) => s !== subskill));
    }
  };

  const handleAddCustomSkill = () => {
    // Add the custom skill and its subskills to the list of selected skills and subskills
    setSkills([...skills, customSkill]);
    setSubskills([...subskills, ...customSkill.subskills]);

    // Reset the custom skill state and close the dialog
    setCustomSkill({ name: '', subskills: [] });
    setOpenAddSkillDialog(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">
        Welcome to SkillPath
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Profile</StepLabel>
        </Step>
        <Step>
          <StepLabel>Select Skills</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finish</StepLabel>
        </Step>
      </Stepper>
      {getStepContent(activeStep)}
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mt: 2, mr: 1 }}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
          {activeStep === 2 ? 'Finish' : 'Next'}
        </Button>
      </div>
      <Dialog open={openAddSkillDialog} onClose={() => setOpenAddSkillDialog(false)}>
        <DialogTitle>
          Add Custom Skill
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpenAddSkillDialog(false)}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Skill Name"
            value={customSkill.name}
            onChange={(e) => setCustomSkill({ ...customSkill, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <InputLabel htmlFor="custom-subskills">Subskills (comma-separated)</InputLabel>
          <Input
            id="custom-subskills"
            value={customSkill.subskills.join(', ')}
            onChange={(e) =>
              setCustomSkill({
                ...customSkill,
                subskills: e.target.value.split(',').map((subskill) => subskill.trim()),
              })
            }
            fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCustomSkill} color="primary">
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};        
           

         
