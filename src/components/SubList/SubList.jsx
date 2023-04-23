import * as React from 'react';
import { useState, useContext, useEffect } from 'react';


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
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const skillId = ctx.activeSkill?._id;
  const setActiveSub = ctx.handleSetActiveSub;
  const subSkills = ctx.activeSkill?.subSkills;
  const assignUserToSubSkill = ctx.handleAssignUserToSubSkill;
  const unAssignUserFromSubSkill = ctx.handleUnAssignUserFromSubSkill;
  const checkIfUserAssigned = ctx.checkIfUserAssigned;

  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSetActiveSub(index) {
    index ? setActiveSub(index) : setActiveSub(selectedIndex)
  }

  function handleToggle(subIndex) {
    const subSkill = subSkills[subIndex];
    if (handleIsAssigned(subIndex)) {
      unAssignUserFromSubSkill(subSkill);
    } else {
      assignUserToSubSkill(subSkill);
    }
  }

  function handleIsAssigned(subIndex) {
    return subSkills[subIndex]?.usersAssigned?.some((user) => user._id === skillId )
  }

  function handleClickSub(e, sub, subIndex) {
    e.stopPropagation();
    const subId = sub._id;
    const index = subSkills?.findIndex((s) => s._id === subId);
    setSelectedIndex(subIndex);
    handleSetActiveSub(index);
  }

  function handleClickCheckbox(e, subIndex) {
    e.stopPropagation();
    const subSkill = subSkills?.[subIndex];
    const isAssigned = checkIfUserAssigned(subSkill?.usersAssigned)
   
    console.log(`clicked check for sub: ${subIndex}`);

    (isAssigned) ? unAssignUserFromSubSkill(subSkill) : assignUserToSubSkill(subSkill);
  }

  useEffect(() => {
    handleSetActiveSub()
  }, [selectedIndex]); 

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 1 }}>
      {subSkills?.map((sub, subIndex) => {
        const labelId = `checkbox-list-label-${subIndex}`;

        return (
          <ListItem key={`subListItem-${subIndex}`} disablePadding>
            <ListItemButton
              onClick={(e) => handleClickSub(e, sub, subIndex)}
              selected={selectedIndex === subIndex}
              sx={{
                backgroundColor: selectedIndex === subIndex ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                width: '100%',
              }}
            >
              <Checkbox
                edge="start"
                onChange={() => handleToggle(subIndex)}
                checked={handleIsAssigned(subIndex)}
                inputProps={{ 'aria-labelledby': labelId }}
                sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                onClick={(e) => handleClickCheckbox(e, subIndex)}
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