import React from 'react';
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
  } from 'semantic-ui-react';

import { Outlet } from 'react-router-dom';

import SideBar from '../../components/MainSideBar/MainSideBar';
import PageHeader from '../../components/PageHeader/PageHeader';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainSideBar from '../../components/MainSideBar/MainSideBar';


function Layout({ getSkill, skill, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill}) {
    
    

    return (
  
        <Container  style={{ margin: 0, padding: 0, "min-height": '100vh' }}>
            <FixedMenuHeader getSkill={getSkill} loggedUser={loggedUser} handleLogout={handleLogout} skill={skill}/>

            <MainSideBar getSkill={getSkill} activeSkill={skill} loggedUser={loggedUser} handleLogout={handleLogout} allSkills={allSkills} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill}/>

                    <Segment id='main-seg' inverted fixed='bottom' vertical style={{ "margin": '0', padding: '0em 0em', "height": "2em" }}>
                        <Container textAlign='center'>
                            <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='#'>
                                Site Map
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Contact Us
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Terms and Conditions
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Privacy Policy
                            </List.Item>
                            </List>
                        </Container>
                    </Segment>

        </Container>
       
            

        // </div>

    );
}

export default Layout;