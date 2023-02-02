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

import SideBar from '../../components/SideBar/SideBar';
import PageHeader from '../../components/PageHeader/PageHeader';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';


function Layout({loggedUser, handleLogout, allSkills, handleAddSkill }) {
    
    

    return (
        // <div style={{ margin: 0, padding: 0, border: 0}} >
        
            <Grid>
                <Grid.Row>
                <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} />

                </Grid.Row>
                <Grid.Row style={{ margin: '0em 0em 0em', padding: '0em 0em' }}>
                    <Grid.Column>
                        <SideBar allSkills={allSkills} loggedUser={loggedUser} handleLogout={handleLogout} handleAddSkill={handleAddSkill}/>
                    </Grid.Column>
                    
                    {/* <Grid.Column>
                        <Outlet />
                    </Grid.Column> */}
                </Grid.Row>
                <Grid.Row style={{ margin: '0em 0em 0em', padding: '0em 0em' }}>
                    <Segment inverted fixed='bottom' vertical style={{ margin: '0em 0em 0em', padding: '0em 0em' }}>
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
                </Grid.Row>
            </Grid>
            
        


        // </div>

    );
}

export default Layout;