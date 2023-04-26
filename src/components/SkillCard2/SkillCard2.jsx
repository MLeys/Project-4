import React from "react";
import mainTheme from "../../themes/mainTheme";
import { useContext, useEffect, useState } from "react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip'

import { TrashIcon } from "../../customIcons";


function SkillCard2({ skill, index }) {
  const ctx = useContext(SkillsContext);
  const deleteSkill = ctx.deleteSkill;


  const handleDeleteClick = () => {
    deleteSkill(skill._id);
  };


  const chips = skill?.subSkills?.map((subSkill, index) => (
    <Chip
      key={index}
      label={subSkill.title}
      
    />
  ));


  return (
    <Card sx={{width: '100%'}} >
      <CardHeader
        title={skill.name}
        action={
          <IconButton onClick={handleDeleteClick} aria-label="delete skill">
            <TrashIcon />
          </IconButton>
        }
      />
      <CardContent >
        <Typography variant="h6" component="div">
          Subskills:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {chips}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SkillCard2;