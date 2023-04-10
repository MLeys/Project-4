import { useState, useEffect, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";



import SubSkillPane from "../SubSkillPane/SubSkillPane";
import SearchForm from "../SearchForm/SearchForm";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 2 }}>
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
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function SkillPane() {
  const ctx = useContext(SkillsContext)
  const skill = ctx.activeSkill?.skill;
	const skillIndex = ctx.activeSkill?.index;
	const subSkills = ctx.activeSkill?.subSkills;
	const handleSetActiveSub = ctx.handleSetActiveSub;
	const activeSub = ctx.activeSub;
	const activeSubIndex = ctx.activeSub?.index;

	const theme = useTheme();

	const [activeTab, setActiveTab] = useState(activeSubIndex);
	const [value, setValue] = useState(0);

  const handleChangeIndex = (index) => {
    setActiveTab(index);
		handleSetActiveSub(index)
  };
	
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
		console.log('CHANGED TAB')
		const activeIndex = newValue;
		const activeSubId = subSkills[activeIndex]?._id;
    const subIndex = subSkills?.findIndex(sub => sub._id === activeSubId);
    handleSetActiveSub(subIndex)	
  };


	useEffect(() => {

	}, [!subSkills])
	

	return (
		<Box bgcolor={'primary.light'} height={'100dvh'} >
			<AppBar position="static" sx={{backgroundColor: 'primaryDarker.dark', color: 'primary.contrastText'}}>
				<Tabs
					textColor="inherit"
					indicatorColor="secondary"
					value={activeSubIndex}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					aria-label="scrollable force subskill tabs"
				>
					{subSkills?.map((sub, index) => (
						<Tab label={sub.title} {...a11yProps({index})} key={`tabKey-${index}`}/>
					))}
				</Tabs>
			</AppBar>
			<SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
				animateTransitions
        onChangeIndex={handleChangeIndex}
      >
				<Box >
					<Box bgcolor={'primary.main'} sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
						<SearchForm />
					</Box>

					{subSkills?.map((sub, index) => (
					<TabPanel value={value} index={index} key={`panelKey-${index}`} dir={theme.direction}>
						<SubSkillPane />
					</TabPanel>
					))}
				</Box>

			</SwipeableViews>
	</Box>
	)
}
export default SkillPane;