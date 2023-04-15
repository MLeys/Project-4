import React from "react";
import mainTheme from "../../themes/mainTheme";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { TrashIcon } from "../../customIcons";

import { AnimatedChip, StyledCard, StyledCardContent, StyledChip } from "./CustomComponents";


function SkillCard({ skill, index }) {
  const navigate = useNavigate();
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const deleteSkill = ctx.deleteSkill;
  const getSkills = ctx.getSkills;

  const [loaded, setLoaded] = useState(false);

  const handleDeleteClick = () => {
    deleteSkill(skill._id);
    getSkills();
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoaded(true);
    }, index * 200); // Add delay based on card index
    return () => clearTimeout(timerId);
  }, [index]);

  const chips = skill.subSkills.map((subSkill, index) => (
    <StyledChip
      key={index}
      label={subSkill.title}
      className={`${loaded ? "loaded" : ""} delay-${index}`}
    />
  ));


  return (
    <StyledCard className={loaded ? "loaded" : ""}>
      <CardHeader
        title={skill.name}
        action={
          <IconButton onClick={handleDeleteClick} aria-label="delete skill">
            <TrashIcon />
          </IconButton>
        }
      />
      <StyledCardContent >
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
      </StyledCardContent>
    </StyledCard>
  );
}

export default SkillCard;