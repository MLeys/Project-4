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
    primarySat: {
      light: '#a0b8c0',
      main: '#90c0d0',
      dark: '#81c8df',
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
      light: '#ccebeb',
      main: '#66c2c2',
      dark: '#009999',
      contrastText: '#000000',
    },
    teal2: {
      light: '#bfd9d9',
      main: '#66a3a3',
      dark: '#006666',
      contrastText: '#000000',
    },
    tealGray: {
      light: '#e0ebeb',
      main: '#9cbdbd',
      dark: '#006666',
      contrastText: '#000000',
    },
    tealGrayLight: {
      light: '#d1e0e0',
      main: '#b3cccc',
      dark: '#85adad',
      contrastText: '#000000',
    },
    blue: {
      light: '#0099cc',
      main: '#0a709e',
      dark: '#134b75',
      contrastText: '#000000',
    },
    blue2: {
      light: '#144770',
      main: '#079dcd',
      dark: '#00ccff',
      contrastText: '#000000',
    },
    blueGray: {
      light: '#6d747c',
      main: '#4d6176',
      dark: '#264a6e',
      contrastText: '#000000',
    },
    blueGrayLight: {
      light: '#9cbdbd',
      main: '#336680',
      dark: '#144770',
      contrastText: '#000000',
    },
    blueGrayLight2: {
      light: '#ced3d6',
      main: '#aec2cc',
      dark: '#8db1c3',
      contrastText: '#000000',
    },
    blueTealGray: {
      light: '#9cbdbd',
      main: '#6d96a2',
      dark: '#528092',
      contrastText: '#000000',
    },
    blueTeal: {
      light: '#008a91',
      main: '#006680',
      dark: '#003d6b',
      contrastText: '#FFFFFF',
    },
    blueTealDark: {
      light: '#009496',
      main: '#007085',
      dark: '#004770',
      contrastText: '#FFFFFF',
    },
    blueTealLight: {
      light: '#2ec7cc',
      main: '#1cb5cc',
      dark: '#0da6cc',
      contrastText: '#FFFFFF',
    },
    blueTealBright: {
      light: '#0af5cc',
      main: '#1ce3cc',
      dark: '#33cccc',
      contrastText: '#FFFFFF',
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