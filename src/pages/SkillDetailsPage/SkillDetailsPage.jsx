// SkillDetails.js
import React from 'react';
import { useState } from 'react';

import { Container, Typography, Box, Card, CardContent, CardHeader, IconButton, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CardActions from '@mui/material/CardActions';



const ArrowBack = () => <i className="bi bi-arrow-left"></i>;
const Add = () => <i className="bi bi-plus"></i>;
const Delete = () => <i className="bi bi-dash"></i>;

const SkillDetailsPage = () => {
  const skill = {
    name: 'Skill Name',
    proficiency: 'Intermediate',
    description: 'Skill description goes here.',
    subskills: [
      {
        name: 'Subskill 1',
        description: 'Subskill 1 description goes here.',
        proficiency: 'Beginner',
        progress: 40,
        resources: [
          {
            title: 'Resource 1',
            description: 'Resource 1 description goes here.',
            url: 'https://www.youtube.com/embed/video-id',
            dateAdded: '2023-04-20',
            completed: false
          }
        ]
      },
      {
        name: 'Subskill 2',
        description: 'Subskill 2 description goes here.',
        proficiency: 'Intermediate',
        progress: 60,
        resources: []
      }
    ]
  };

  const handleBackClick = () => {
    // Implement navigation to Home screen
  };

  const handleAddSubskill = () => {
    // Implement navigation to Create Subskill screen
  };

  const handleDeleteSkill = () => {
    // Implement skill deletion logic
  };

  const [currentSkill, setCurrentSkill] = useState(skill);

  const handleResourceToggle = (subskillIndex, resourceIndex) => {
    const updatedSkill = { ...currentSkill };
    updatedSkill.subskills[subskillIndex].resources[resourceIndex].completed = !updatedSkill.subskills[subskillIndex].resources[resourceIndex].completed;
    setCurrentSkill(updatedSkill);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <IconButton color="primary" onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
        <Grid container spacing={4}>
          <Grid xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {skill.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {skill.proficiency}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {skill.description}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Divider />
              <List>
                <ListItem>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleAddSubskill}
                    fullWidth
                  >
                    Add Subskill
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={handleDeleteSkill}
                    fullWidth
                  >
                    Delete Skill
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h4" component="h1">
            {currentSkill.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {currentSkill.proficiency}
          </Typography>
          <Typography variant="body1" component="p">
            {currentSkill.description}
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" component="h2">
            Subskills
          </Typography>
          {currentSkill.subskills.map((subskill, subskillIndex) => (
            <Card key={subskillIndex} sx={{ mt: 2 }}>
              <CardHeader title={subskill.name} subheader={subskill.proficiency} />
              <CardContent>
                <Typography variant="body2">{subskill.description}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6">Resources</Typography>
                {subskill.resources.map((resource, resourceIndex) => (
                  <Paper key={resourceIndex} sx={{ mt: 2, p: 2 }}>
                    <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                      <iframe
                        title={resource.title}
                        src={resource.url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="h6">{resource.title}</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Added on {resource.dateAdded}
                      </Typography>
                      <Typography variant="body2">{resource.description}</Typography>
                      <CardActions>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={resource.completed}
                              onChange={() => handleResourceToggle(subskillIndex, resourceIndex)}
                              color="primary"
                            />
                          }
                          label={resource.completed ? 'Completed' : 'Incomplete'}
                        />
                      </CardActions>
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  </Container>
  );
};

export default SkillDetailsPage;
