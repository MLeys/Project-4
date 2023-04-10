import * as React from 'react';
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

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

export default function VerticalTabs({children, titleArray=['default1', 'default2']}) {
  const ctx = useContext(SkillsContext)
	const handleSetActiveSkill = ctx.handleSetActiveSkill;
	const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleSetActiveSkill(newValue)
  };

  return (
    <Box sx={{ display: 'flex'}} className='fullScreenHeight'>
      <Grid component={Box} xs={2} >
        <Tabs
          textColor='secondary'
          indicatorColor='secondary'
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'primaryDarker.dark', backgroundColor: 'primary.main', height: '100%' }}
        >
          {titleArray.map((title, index) => (
            <Tab label={title} {...a11yProps(index)} sx={{bgcolor: 'primary.dark', color: 'primary.contrastText', border: 1, borderRight: 2,}} />
          ))}
        </Tabs>
      </Grid>
      <Grid component={Box} xs={10} width={'100%'}  >
      {titleArray.map((title, index) => (
       
          <TabPanel value={value} index={index}  >
            {children}
          </TabPanel>
       
        ))}
      </Grid>
    </Box>
  );
}
