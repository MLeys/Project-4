import React from "react";
import mainTheme from "../../themes/mainTheme";
import { useContext, useEffect, useState } from "react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { TrashIcon } from "../../customIcons";

import { AnimatedChip, StyledCard, StyledCardContent } from "./CustomComponents";


function SkillCard({ skill, index }) {
  const ctx = useContext(SkillsContext);
  const deleteSkill = ctx.deleteSkill;

  const [loaded, setLoaded] = useState(false);

  const handleDeleteClick = () => {
    deleteSkill(skill._id);
  };


  const chips = skill.subSkills.map((subSkill, index) => (
    <AnimatedChip
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