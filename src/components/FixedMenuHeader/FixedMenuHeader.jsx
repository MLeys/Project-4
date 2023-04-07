import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
		Image,
		Menu,
		Icon,
		Header,
		Segment
} from 'semantic-ui-react'


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";





function FixedMenuHeader({ handleLogout, sidebarDispatch }) {
	const navigate = useNavigate();
	const loggedUser = useContext(SkillsContext).loggedUser;

	const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);






	return (  
		<Menu 
			borderless={true}
			inverted={true}
			attached='top'
			style={{padding: '0em', margin: '0'}}
		>
			<Menu.Menu position="left">
				<Menu.Item 
					position="left"
					as='a' 
					header={true} 
					onClick={(e, data) => {
						sidebarDispatch({ 
								type: 'CHANGE_ANIMATION', 
								animation: 'slide out' 
						})
					}}
			
				> 
					<Icon name="content" size="large"/>Menu
				</Menu.Item>

			</Menu.Menu>

			<Menu.Item
				as={Header}
				position="right"
			>
				
				Skills.Map
			</Menu.Item>
			<Menu.Menu position="right">

				<Menu.Item onClick={() => navigate(`/${loggedUser?.username}`)}>
					<Image
						src={
							loggedUser?.photoUrl
							? loggedUser?.photoUrl
							: "https://react.semantic-ui.com/images/wireframe/square-image.png"
						}
						avatar 
						circular={true}
						centered={true}
						style={{ backgroundColor: 'teal'}}
					/>Dashboard
				</Menu.Item>
				<Menu.Item onClick={handleLogout} floated="right">Logout</Menu.Item>
				<Menu.Item 
					onClick={() => navigate("/")}
					position='left'
				>
					<Icon name="home" size="large"/>
				</Menu.Item>
			</Menu.Menu>
		</Menu>

	);
 }
 
 export default FixedMenuHeader;