import React from "react";
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
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
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
                <Menu.Item as='a'>
                    Skill.map
                </Menu.Item>
                <Menu.Item as='a'>
                    <Link to="/">
                        <Icon name="home"></Icon>
                    </Link>
                </Menu.Item>

                <Dropdown item simple text='Options'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as="a" floated="right">
                    <Link to="" onClick={handleLogout}>
                        Logout
                    </Link>
                </Menu.Item>
            </Container>
        </Menu>
    );
 }
 
 export default FixedMenuHeader;