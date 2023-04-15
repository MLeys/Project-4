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
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    '& .MuiIconButton-root': {
      color: theme.palette.secondary.contrastText,
    }
  },
  '& .MuiCardContent-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '& .MuiChip-root': {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  opacity: 0,
  transform: "translateY(-100%)",
  transition: "all 0.5s ease-out",
  "&.loaded": {
    opacity: 1,
    transform: "translateY(0%)",
    "& .MuiChip-root": {
      opacity: 1,
      transform: "scale(1)",
      transitionDelay: "0.2s",
    },
  },

}));

export const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiChip-root": {
    opacity: 0,
    transition: "all 0.5s ease-out",
  },
  "& .animate .MuiChip-root": {
    opacity: 1,
  },
});

export const StyledChip = styled(Chip)({
  opacity: 0,
  transform: "scale(0)",
  animation: `$grow 0.5s ease forwards`,
  "&.loaded": {
    animationDelay: "0.2s",
  },
  "&.delay-1": {
    animationDelay: "0.4s",
  },
  "&.delay-2": {
    animationDelay: "0.6s",
  },
  "&.delay-3": {
    animationDelay: "0.8s",
  },
  "&.delay-4": {
    animationDelay: "1.0s",
  },
  "&.delay-5": {
    animationDelay: "1.2s",
  },
  "&.delay-6": {
    animationDelay: "1.4s",
  },
  "@keyframes grow": {
    "0%": {
      opacity: 0,
      transform: "scale(0)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.2)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});

export const AnimatedChip = styled(Chip)(({ theme }) => ({
  position: "relative",
  animation: `$myEffect 0.5s ease forwards`,
  transform: "scale(0)",
  animationDelay: `${Math.random() * 0.5}s`,
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