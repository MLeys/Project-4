import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Image,
    Menu,
    Icon
} from 'semantic-ui-react'

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


function FixedMenuHeader({ handleLogout, sidebarDispatch }) {
    const navigate = useNavigate();
    const loggedUser = useContext(SkillsContext).loggedUser;


    return (  
        <Menu inverted style={{padding: '0em', margin: '0'}}>
            <Menu.Item as='a' header onClick={() =>
                sidebarDispatch({ 
                    type: 'CHANGE_ANIMATION', 
                    animation: 'overlay' 
                })
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