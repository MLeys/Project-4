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

  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;

  
  const [checked, setChecked] = useState([0]);

  const handleToggle = (subIndex) => () => {
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
    return activeSkill?.subSkills[subIndex]?.usersAssigned?.some((user) => user._id === skillId )
  }


  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'blueGrayLight.light' }}>
      {activeSkill?.subSkills?.map((sub, subIndex) => {
        const labelId = `checkbox-list-label-${subIndex}`;

        return (
          <ListItem
            key={`subListItem-${subIndex}`}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(subIndex)}
                checked={handleIsAssigned(subIndex)}
                inputProps={{ 'aria-labelledby': labelId }}
                />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={`${sub.title} ${subIndex + 1}`} />
            </ListItemButton>
            <Divider />
          </ListItem>
        );
      })}
    </List>
  );
}