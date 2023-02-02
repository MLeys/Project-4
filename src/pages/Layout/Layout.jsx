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


function Layout({loggedUser, handleLogout}) {
    return (
        <div>
            <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} />

            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>---Fixed Template Layout---</Header>
                <SideBar />
                <Outlet />
            </Container>

                <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                    <Container textAlign='center'>
                        <Grid divided inverted stackable>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 1' />
                            <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                            <List.Item as='a'>Link Two</List.Item>
                            <List.Item as='a'>Link Three</List.Item>
                            <List.Item as='a'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 2' />
                            <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                            <List.Item as='a'>Link Two</List.Item>
                            <List.Item as='a'>Link Three</List.Item>
                            <List.Item as='a'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 3' />
                            <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                            <List.Item as='a'>Link Two</List.Item>
                            <List.Item as='a'>Link Three</List.Item>
                            <List.Item as='a'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header inverted as='h4' content='Footer Header' />
                            <p>
                            Extra space for a call to action inside the footer that could help re-engage users.
                            </p>
                        </Grid.Column>
                        </Grid>

                        <Divider inverted section />
                        <Image centered size='mini' src='/logo.png' />
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

        </div>




        // <Grid>
        //     <Grid.Row>
        //         <Grid.Column>
                  
        //             <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
        //         </Grid.Column>
        //     </Grid.Row>
        //     <Grid.Row>
        //         <Grid.Column>
        //             <Outlet />
        //         </Grid.Column>
        //     </Grid.Row>
        // </Grid>
    );
}

export default Layout;