import * as React from 'react';
import { useState, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';


import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

export default function SubList() {
  const ctx = useContext(SkillsContext);
  const activeSub = ctx.activeSub;
  const activeSkill = ctx.activeSkill;
  

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

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {activeSkill?.subSkills?.map((value, subIndex) => {
        const labelId = `checkbox-list-label-${subIndex}`;

        return (
          <ListItem
            key={`subListItem-${subIndex}`}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(subIndex)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(subIndex) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.title}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}