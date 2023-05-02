import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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
   
    console.log(`clicked check for sub: ${subIndex}`);
    console.log(isAssigned, "< isAssigned")

    if (isAssigned) {
      unAssignUserFromSubSkill(subSkill)
    } else {
      assignUserToSubSkill(subSkill)
    }
    
  }

  useEffect(() => {
    handleSetActiveSub()
  }, [selectedIndex, subSkills]); 

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'tealGray.light', borderRadius: '8px', boxShadow: 1 }}>
      {subSkills?.map((sub, subIndex) => {
        const labelId = `checkbox-list-label-${sub._id}`;

        return (
          <ListItem key={`subListItem-${subIndex}-${sub._id}`} disablePadding>
            <ListItemButton
              onClick={(e) => handleClickSub(e, sub, subIndex)}
              selected={selectedIndex === subIndex}
              sx={{
                backgroundColor: selectedIndex === subIndex ? 'blueTealGray.dark' : 'transparent',
                '&:hover': {
                  backgroundColor: 'tealLight.main',
                },
                '&.Mui-selected': {
                  backgroundColor: 'blueTealGray.light',
                  '&:hover': {
                    backgroundColor: 'tealLight.light',
                  },
                },
                width: '100%',
              }}
            >
              <Checkbox
                edge="start"
                checked={checkIfUserAssigned(sub.usersAssigned)}
                inputProps={{ 
                  'aria-labelledby': labelId,
                }}
                sx={{ 
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  color: 'black',
                  // backgroundColor: 'tealGray.main',
                  '&.Mui-checked': { 
                    color: 'blueTeal.dark',
                    // backgroundColor: 'tealGray.light' 
                  },
                  '&:hover': {
                    color: 'blueGray.dark',
                    backgroundColor: 'tealGray.light',
                  },

                }}
                onClick={(e) => handleClickCheckbox(e, subIndex, sub)}
              />
              <ListItemText id={labelId} primary={`${sub.title} ${subIndex}`} />
            </ListItemButton>
            <Divider />
          </ListItem>
        );
      })}
    </List>
  );
}