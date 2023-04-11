import React, { useState, useContext, useEffect, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
		Image,
		// Menu,
		Icon,
		Header,
		Segment
} from 'semantic-ui-react'
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import mainTheme from "../../themes/mainTheme";


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";





function FixedMenuHeader({ sidebarDispatch }) {
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


	return (  
		<>
		<AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: mainTheme.palette.primary.dark, 
        color: mainTheme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="100%" >
        <Toolbar disableGutters >
				<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <Tooltip title='See All Skills'>
              <IconButton
								
                size="big"
                aria-label="More Information"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon  color="secondary" />
              </IconButton>
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
							}}
							onClick={() => {
								sidebarDispatch({ 
										type: 'CHANGE_ANIMATION', 
										animation: 'slide out' 
								})
							}}
						>
							Skill.Map
							<ArrowDropDownIcon alt='droparrow' fontSize="large" />
						</Typography>
					</Tooltip>
					<Tooltip title="Skills Menu">
						<IconButton 
							sx={{ p: 0, m: 0, backgroundColor: 'accent.dark', color: 'accent.contrastText', display: { xs: 'none', sm: 'flex' } }}
							onClick={(e, data) => {
								sidebarDispatch({ 
										type: 'CHANGE_ANIMATION', 
										animation: 'slide out' 
								})
							}}
						>
							<ArrowDropDownIcon alt='droparrow' fontSize="large" />
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
                  <Avatar alt="MyAvatar" src={loggedUser?.photoUrl? loggedUser?.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} />
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
							<MenuItem  
								key={`logout`}
								sx={{ margin: 0}}
								onClick={() => {
										handleCloseUserMenu(),
										handleLogout()
								}}
							>
								Logout  
							</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
		</>
	);
 }
 
 export default FixedMenuHeader;