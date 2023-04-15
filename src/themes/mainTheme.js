import { createTheme } from "@mui/material/styles";


const mainTheme = createTheme({
  palette: {
    text: {
      primary: '#333333',
      secondary: '#FFFFFF'
    },
    primary: {
      light: '#63d7ff',
      main: '#00acc1',
      dark: '#007c91',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffab40',
      main: '#ff9100',
      dark: '#c56200',
      contrastText: '#000000',
    },
    accent: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    primaryDarker: {
      light: '#b3f4ff',
      main: '#005766',
      dark: '#002b33',
      contrastText: '#ffffff',
    },
    green: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    darkGreen: {
      light: '#a5d6a7',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    teal: {
      light: '#b3ffe6',
      main: '#00ffaa',
      dark: '#009966',
      contrastText: '#000000',
    },
    teal2: {
      light: '#bef4e9',
      main: '#3bdebd',
      dark: '#16836d',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },

});

export default mainTheme;