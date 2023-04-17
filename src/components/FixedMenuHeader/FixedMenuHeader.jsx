import React, { useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { CssBaseline, useTheme } from "@mui/material";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import mainTheme from "../../themes/mainTheme";

import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import { ListIcon } from "../../customIcons";

import SkillDrawer from "../SkillDrawer/SkillDrawer";


function FixedMenuHeader() {
  const theme = useTheme();
	const navigate = useNavigate();
	const ctx = useContext(SkillsContext);
	const loggedUser = ctx.loggedUser;
	const handleLogout = ctx.handleLogout;
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);

	const sections = [
		{ title: "Home", link: "#", target: '', icon: 'bi bi-house-fill' },
		{ title: "Dashboard", link : loggedUser?.username, icon: 'bi bi-compass-fill' }
	]

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenSidebar(!openSidebar);
  };

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

  function handleClickIcon(page) {
    
    navigate(`/${page.target}`)
  }

	return (  
		<Box  sx={{ display: 'flex' }}>
      <CssBaseline />
		  <AppBar 
        position="fixed"
        sx={{ 
          backgroundColor: mainTheme.palette.primaryDarker.dark, 
          color: mainTheme.palette.primary.contrastText,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* Small Screen Left Side Toolbar */}
        <Toolbar > 
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer()}
              sx={{ 
                mr: 1.5, 
                my: 1.3, 
                bgcolor: 'primary.dark',
                ":hover": {backgroundColor:'accent.dark'}
              }}
              
            >
              <ListIcon height={24} width={24}/>
            </IconButton>
            {sections.map((page, index) => (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => handleClickIcon( page)}
                  sx={{ 
                    mr: 1, 
                    my: 1,
                    display: { xs: 'block', md: 'none' },
                    ":hover": {color:'accent.light'}
                  }}
                  
                >

                  <i as='a' class={page.icon}></i>
                </IconButton>
              </>
            ))}
          </Box>

          <Tooltip title="Click for All Skills Menu">
            <Typography
              variant="h4"
              color={mainTheme.palette.common.white}
              sx={{
                mr: 5,
                display: { xs: 'flex', sm: 'none' },
                flexGrow: 1,
                fontWeight: 400,
                letterSpacing: '.2rem',
              }}
              aria-label="More Information"
              aria-controls="menu-appbar"
              aria-haspopup="true"
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
                },
               
              }}
              onClick={toggleDrawer()}
            >
              <ListIcon height={20} width={20} />
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
              
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {loggedUser ? (
                [
                  <MenuItem
                    key={`logout-user`}
                    sx={{ m: 0 }}
                    onClick={() => {
                      handleCloseUserMenu(),
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>,
                  <MenuItem
                    key={`learnpage`}
                    sx={{ m: 0 }}
                    onClick={() => {
                      handleCloseUserMenu(),
                      handleClickLearnPage();
                    }}
                  >
                    Learn
                  </MenuItem>,
                ]
              ) : (
                [
                  <MenuItem
                    key={`signin`}
                    sx={{ m: 0 }}
                    onClick={() => {
                      handleClickSignIn();
                    }}
                  >
                    Sign-In
                  </MenuItem>,
                  <MenuItem
                    key={`signup`}
                    sx={{ m: 0 }}
                    onClick={() => {
                      handleClickSignUp();
                    }}
                  >
                    Sign-Up
                  </MenuItem>,
                ]
              )}
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SkillDrawer open={openSidebar} toggleDrawer={toggleDrawer} />
      
	  </Box>
	);
 }
 
 export default FixedMenuHeader;