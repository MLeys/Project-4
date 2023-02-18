import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


 import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
    Icon
  } from 'semantic-ui-react'

import SidebarReducer from "../Reducers/SidebarReducer";



function FixedMenuHeader({ loggedUser, handleLogout, dispatch }) {
    const navigate = useNavigate();


    return (  
        <Menu inverted style={{padding: '0em', margin: '0'}}>
            <Menu.Item as='a' header onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
                    }>
                Skill.map
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/")}>
                <Icon name="home"></Icon>
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
                    />
                </Menu.Item>
                <Menu.Item onClick={handleLogout} floated="right">Logout</Menu.Item>
            </Menu.Menu>
        </Menu>

    );
 }
 
 export default FixedMenuHeader;