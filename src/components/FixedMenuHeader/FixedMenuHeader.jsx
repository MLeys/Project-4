import React, { useState, useContext, useEffect, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import { CssBaseline, useTheme } from "@mui/material";
import mainTheme from "../../themes/mainTheme";

import Cssbaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';


import {
  DownArrowBoxed,
  ListIcon
} from "../../customIcons";

import SideDrawer from "../SideDrawer/SideDrawer";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";



function FixedMenuHeader({ sidebarDispatch }) {
  const theme = useTheme();
	const navigate = useNavigate();
	const ctx = useContext(SkillsContext);
	const loggedUser = ctx.loggedUser;
	const handleLogout = ctx.handleLogout;
  

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

	const sections = [
		{ title: "Home", link: "#", target: '' },
		{ title: "Dashboard", link : loggedUser?.username }
	]
	

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleClickSignIn() {
    navigate(`/login`);
  }

  function handleClickSignUp() {
    navigate(`/signup`);
  }

  function handleClickLearnPage() {
    navigate(`/learn`);
  }


	return (  
		<Box container sx={{ display: 'flex' }}>
      <CssBaseline />
		<AppBar 
      position="sticky"
      sx={{ 
        backgroundColor: mainTheme.palette.primaryDarker.dark, 
        color: mainTheme.palette.primary.contrastText,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        
      }}
    >
      <Toolbar >
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
        <Tooltip title='See All Skills'>
          <SideDrawer />
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {sections.map((page, index) => (
            <MenuItem key={`menuItem-${index}`}>
              <Link 
                key={page.title} 
                variant='subtitle1'
                underline='hover'
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/${page.link}`); 
                }}>
                {page.title}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
        <Tooltip title="Click for All Skills Menu">
          <Typography
            variant="h6"
            as={Button}
            color={mainTheme.palette.common.white}
            sx={{
              mr: 5,
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              ":hover": {backgroundColor:'accent.dark'}
            }}
            aria-label="More Information"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            Skill.Map
          </Typography>
        </Tooltip>
        <Tooltip title="Skills Menu">
            <IconButton 
              sx={{
                p: 0, 
                m: 0,  
                color: 'accent.contrastText', 
                display: { xs: 'none', sm: 'flex' },
                ":hover": {
                  // backgroundColor:'accent.main',
                  fillOpacity: 1,
                  color: 'accent.main',
                }
              }}
              onClick={() => console.log("CLICKED Downdownarrow")}
            >
              
              <SideDrawer />
              <DownArrowBoxed height={24} width={24}/>
              {/* &nbsp; Skills */}
            </IconButton>
        </Tooltip>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
          {sections.map((page) => (
            <Button
              key={page.title}
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={() => {
                handleCloseNavMenu();
                navigate(`/${page.link}`); 
              }}
            >
              {page.title}
            </Button>
          ))}
        </Box>

        <Typography
          variant="h4"
          sx={{
            alignItems: 'center',
            mr: 12,
            display: { xs: 'none', sm: 'flex' },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '.2rem',
          }}
        >
            Skill.Map
        </Typography>
        <Box sx={{ flexGrow: 0 }} >
          <Stack direction='row'>
            <Tooltip title="logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="MyAvatar" src={loggedUser?.photoUrl? loggedUser?.photoUrl : ""} />
              </IconButton>
            </Tooltip>
          </Stack>
          
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
          
          {loggedUser ? (
            <>
            <MenuItem  
              key={`logout-user`}
              sx={{ m: 0}}
              onClick={() => {
                  handleCloseUserMenu(),
                  handleLogout()
              }}
            >
              Logout  
            </MenuItem>
            <MenuItem  
            key={`learnpage`}
            sx={{ m: 0}}
            onClick={() => {
                handleCloseUserMenu(),
                handleClickLearnPage()
            }}
          >
            Learn Page  
          </MenuItem>
          </>
            ) : 
            <>
              <MenuItem
                key={`signin`}
                sx={{m: 0}}
                onClick={() => {handleClickSignIn()}}
              >
                Sign-In
              </MenuItem>
              <MenuItem
                key={`signup`}
                sx={{m: 0}}
                onClick={() => {handleClickSignUp()}}
              >
                Sign-Up
              </MenuItem>
            </>
          }
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
		</Box>
	);
 }
 
 export default FixedMenuHeader;