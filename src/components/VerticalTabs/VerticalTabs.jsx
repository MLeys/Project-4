import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Toolbar from "@mui/material/Toolbar";

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      display='block'
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box  >
          {children}
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({children}) {
  const theme = useTheme();

  const ctx = useContext(SkillsContext)
	const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const skills = ctx.skills;
  const userId = ctx.loggedUser?._id;

  const userSkills =skills?.filter((skill => skill.usersAssigned.some(u => u._id === userId)))
  console.log(userSkills, "<--- userSkills")


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleSetActiveSkill(newValue)
  };

  useEffect(() => {

  }, [])


  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'tealGray.main', display: 'flex', width: '100%'}}>
      <Toolbar />
      <Tabs

        textColor='secondary'
        indicatorColor='secondary'
        scrollButtons
        allowScrollButtonsMobile
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Skill Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'teal2.dark', bgcolor: 'primary.dark'}}
      >
      {userSkills?.map((skill, index) => (
        <Tab key={`titleTab-${index}`} label={skill.name} {...a11yProps(index)} sx={{bgcolor: 'primary.dark', color: 'primary.contrastText', border: 1, borderRight: 2,}} />
      ))}
      </Tabs>
      {userSkills?.map((skill, index) => (
        <TabPanel key={`panel-${index}`}  value={index} index={index}  >
          {children}
        </TabPanel>
      ))}
    </Box>
  );
}
