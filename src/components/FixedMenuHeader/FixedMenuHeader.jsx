import React, { useState } from "react";
import { Link } from "react-router-dom";


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

  

function FixedMenuHeader({ loggedUser, handleLogout }) {


    return (  
        <>
            <Menu.Item as='a'>
                <Link to="/">
                    <Icon name="home"></Icon>
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link to={`/${loggedUser?.username}`}>
                        <Image
                            style={{ marginRight: '1.5em' }} 
                            src={
                            loggedUser?.photoUrl
                                ? loggedUser?.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            }
                            avatar 
                        />
                    </Link>
                </Menu.Item>
                <Menu.Item as="a" floated="right">
                    <Link to="" onClick={handleLogout}>
                        Logout
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </>

    );
 }
 
 export default FixedMenuHeader;