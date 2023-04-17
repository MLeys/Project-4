import React from "react";
import mainTheme from "../../themes/mainTheme";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";

import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip'

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.secondary.main}`,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.teal2.dark,
    color: theme.palette.primary.contrastText,
    '& .MuiIconButton-root': {
      color: theme.palette.primary.contrastText,
    }
  },
  '& .MuiCardContent-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  '& .MuiChip-root': {
    margin: theme.spacing(1.4),
    backgroundColor: theme.palette.teal.light,
    color: theme.palette.secondary.contrastText,
    transition: "transform 0.5s ease-out, background-color 0.2s ease-out",
    transform: "scale(1)",
    opacity: 0,
    animation: `$grow 1.5s ease-in forwards`,
    "&.loaded": {
      animationDelay: "0.2s",
    },
    '&:hover': {
      backgroundColor: theme.palette.teal.main,
      transitionDelay: "0.1s",
      transform: 'scale(1.5)',
    }
  },
  opacity: 0,
  transform: "translateY(-100%)",
  transition: "all 1.5s ease-out",
  "&.loaded": {
    opacity: 1,
    transform: "translateY(0%)",
    "& .MuiChip-root": {
      opacity: 1,
      transform: "scale(1.1)",
      transitionDelay: "0.2s",
    },
  },
  '@keyframes grow': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1.2)',
      opacity: 1,
    }
  },
}));

export const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiChip-root": {
    opacity: 0,
    transform: "scale3d(0.5, 0.5, 0.5) translateZ(0)",
    transition: "all 5.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  "& .animate .MuiChip-root": {
    opacity: 1,
    transform: "scale3d(20, 2, 2) translateZ(0)",
  },
  "& .MuiChip-root:hover": {
    backgroundColor: mainTheme.palette.teal.main,
    transform: "scale3d(1.5, 1.5, 1.5) translateZ(0)",
    transition: "all 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  perspective: "800px",
});



export const AnimatedChip = styled(Chip)(({ theme }) => ({
  position: "relative",
  animation: `$myEffect 10.5s ease forwards`,
  transform: "scale(2)",
  animationDelay: `${Math.random() * 1.5}s`,
  "@keyframes myEffect": {
    "0%": {
      transform: "scale(0)",
      opacity: 0,
    },
    "50%": {
      transform: "scale(1.5)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
  },

}));