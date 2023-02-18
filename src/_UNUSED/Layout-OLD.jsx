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
    Sidebar
  } from 'semantic-ui-react';


import MainSideBar from './MainSideBar/MainSideBar';


function Layout({ getSkill, skill, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill}) {
    
    

    return (
  
        <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>
            <MainSideBar getSkill={getSkill} skill={skill} loggedUser={loggedUser} handleLogout={handleLogout} allSkills={allSkills} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill}/>
                <Segment id='main-seg' inverted fixed='bottom' vertical style={{ margin: '0', padding: '0em 0em', height: "2em", }}>
                    <Container textAlign='center' style={{ innerWidth:'100vw' }}>
                        <List horizontal inverted divided link size='small'>
                            <List.Item >
                                Created by: Mike Leys
                            </List.Item>
                        </List>
                    </Container>
                </Segment>

        </Container>
       
            

        // </div>

    );
}

export default Layout;