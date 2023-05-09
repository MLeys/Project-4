import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import { VertDotsIcon } from '../../customIcons';

export default function SubList() {
  const theme = useTheme()
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const skillId = ctx.activeSkill?.skill?._id;
  const setActiveSub = ctx.handleSetActiveSub;
  const skillIndex = skills?.findIndex((s) => s._id === skillId)
  const subSkills = skills?.[skillIndex]?.subSkills;
  const assignUserToSubSkill = ctx.handleAssignUserToSubSkill;
  const unAssignUserFromSubSkill = ctx.handleUnAssignUserFromSubSkill;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;

  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSetActiveSub(index) {
    index ? setActiveSub(index) : setActiveSub(selectedIndex)
  }

  function handleClickSub(e, sub, subIndex) {
    e.stopPropagation();
    const subId = sub._id;
    const index = subSkills?.findIndex((s) => s._id === subId);
    setSelectedIndex(subIndex);
    handleSetActiveSub(index);
  }

  async function handleClickCheckbox(e, subIndex, sub) {
    e.stopPropagation();
    
    const subSkill = sub;
    const isAssigned = await checkIfUserAssigned(sub.usersAssigned, sub.title)
   
    console.log(`cliy
    cked check for sub: ${subIndex}`);
    console.log(isAssigned, "< isAssigned")

    if (isAssigned) {
      unAssignUserFromSubSkill(subSkill)
    } else {
      assignUserToSubSkill(subSkill)
    }
  }

  const SubItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
  }));

  const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

  useEffect(() => {
    handleSetActiveSub()
  }, [selectedIndex, subSkills]); 


  return (
    <>
    <Box mx={3} my={1} sx={{ maxHeight: 300 }}>
      <Stack 
        spacing={{ xs: 1, sm: 2 }} 
        direction="row" 
        useFlexGap 
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
  
      >
      {subSkills?.map((sub, subIndex) => {
        const labelId = `checkbox-list-label-${sub._id}`;

        return (
          <>
          <Paper 
            key={`subDrawerItem-${subIndex}`} 
            elevation={10}
          >
            <Button
              onClick={(e) => handleClickSub(e, sub, subIndex)}
              selected={selectedIndex === subIndex}
              
              sx={{
                pl: 1,
                py: 0,
                m: 0,
                backgroundColor: selectedIndex === subIndex ? 'blue.light' : 'transparent',
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
            >
              <Checkbox
                edge="start"
                checked={checkIfUserAssigned(sub.usersAssigned)}
                onClick={(e) => handleClickCheckbox(e, subIndex, sub)}
                sx={{
                  color: selectedIndex === subIndex ? 'white' : 'black',
                  '&.Mui-checked': {
                    color: 'blueTeal.dark',
                  },
                }}
              />
                <Typography 
                  color={selectedIndex === subIndex ? 'white' : 'black'}
                >
                  {sub.title}
                </Typography>
            </Button>
          </Paper>
          </>
        );
      })}
      </Stack>
    </Box>
    </>
    
  );
}