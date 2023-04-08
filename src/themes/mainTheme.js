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
    }

  }
});

export default mainTheme;