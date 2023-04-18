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


function FixedMenuHeader({ children }) {
  const theme = useTheme();
	const navigate = useNavigate();
	const ctx = useContext(SkillsContext);
	const loggedUser = ctx.loggedUser;
	const handleLogout = ctx.handleLogout;

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);

	const sections = [
		{ title: "Home", link: "", icon: 'bi bi-house-fill' },
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

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseUserMenu() {
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
    navigate(`/${page.link}`)
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
        <Toolbar > 
          <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer()}
              sx={{ 
                mr: 1.5, 
                my: 1.3, 
                ":hover": {backgroundColor:'accent.dark'}
              }}
            >
              <i as='a' className='bi bi-list'></i>
            </IconButton>
            {sections.map((page, index) => (
                <IconButton
                  key={`headerIcon-${index}`}
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => handleClickIcon( page)}
                  sx={{ 
                    mr: 1, 
                    my: 1,
                    display: { xs: 'block'},
                    ":hover": {color:'accent.light'}
                  }}
                >
                  <i as='a' className={page.icon}></i>
                </IconButton>
              
            ))}
          </Box>
          <Typography
            variant="h4"
            color={mainTheme.palette.common.white}
            sx={{
              mr: 5,
              display: { xs: 'flex'},
              flexGrow: 1,
              fontWeight: 400,
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
                  <MenuItem
                    key={`logout-user`}
                    sx={{ m: 0 }}
                    onClick={() => {
                      handleCloseUserMenu(),
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
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
      <SkillDrawer open={openSidebar ? openSidebar : false} toggleDrawer={toggleDrawer} zIndex={openSidebar ? 1100 : 0} />
      {children}
    </Box>
	);
 }
 
 export default FixedMenuHeader;