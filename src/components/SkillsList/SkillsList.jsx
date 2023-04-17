



function SkillsList({ skill, index, handleSkillToggle, handleClickSkillArrow, handleSubSkillClick }) {
  return ( 
    <>
      <ListItemButton onClick={() => handleSkillToggle( index)}>
        <ListItemText primary={skill.name}  sx={{pr: 2}}/>
        <ListItemSecondaryAction>
          <IconButton
            edge="start"
            size="small"
          >
            {openSkills[index] ? <DownArrowBoxed /> : <BoxArrowRightIcon  />}
          </IconButton>
          <IconButton
            edge="end"
            onClick={(event) => handleClickSkillArrow(index)}
          >
            <BoxArrowRightIcon height={20} width={20} fill="white"/>                  
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
      <LinearProgress variant="determinate" value={skill.progress} color="warning" sx={{mb: 1}} />
      <Collapse in={openSkills[index]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{bgcolor: 'primary.dark'}}>
          {skill.subSkills?.map((subSkill, subIndex) => (
            <div key={`sidebar-${index}-${subIndex}`}>
              <ListItemButton onClick={() => handleSubSkillClick(index, subIndex)}>
                <ListItemText primary={subSkill.title} />
              </ListItemButton>
              <LinearProgress variant="determinate" value={skill.progress} />
            </div>
          ))}
          <Divider />
        </List>
      </Collapse>
      <Divider />
    
    </>

   );
}

export default SkillsList;