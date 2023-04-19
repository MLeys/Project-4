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
  const activeSkill = ctx.activeSkill;
  const skillId = ctx.activeSkill?._id;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const subSkills = ctx.activeSkill?.subSkills;

  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checked, setChecked] = useState([0]);

  function handleToggle(subIndex) {
    const currentIndex = checked.indexOf(subIndex);
    const newChecked = [...checked];
    console.log(checked, " <---- checked")

    if (currentIndex === -1) {
      newChecked.push(subIndex);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  function handleIsAssigned(subIndex) {
    return subSkills[subIndex]?.usersAssigned?.some((user) => user._id === skillId )
  }

  function handleClickSub(e, sub, subIndex) {
    e.stopPropagation();
    const subId = sub._id;
    const index = subSkills?.findIndex((s) => s._id === subId);
    console.log(`Clicked Subskill: ${sub.title} at ${index}`);
    setSelectedIndex(subIndex);
    handleSetActiveSub(index);
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'blueGrayLight.light' }}>
      {subSkills?.map((sub, subIndex) => {
        const labelId = `checkbox-list-label-${subIndex}`;

        return (
          <ListItem
            key={`subListItem-${subIndex}`}
            
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleToggle(subIndex)}
                checked={handleIsAssigned(subIndex)}
                inputProps={{ 'aria-labelledby': labelId }}
                />
            }
            disablePadding
          >
            <ListItemButton 
              onClick={(e) => handleClickSub(e,sub, subIndex)}
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
              }}
            >
              <ListItemText id={labelId} primary={`${sub.title} ${subIndex}`} />
            </ListItemButton>
            <Divider />
          </ListItem>
        );
      })}
    </List>
  );
}