import {
    Segment,
    Container,
    List
} from "semantic-ui-react"

function MainFooter() {
    return ( 
        <Segment id='main-seg' inverted fixed='bottom' vertical style={{ margin: '0', padding: '0em 0em', height: "2em", }}>
            <Container textAlign='center' style={{ innerWidth:'100vw' }}>
                <List horizontal inverted divided link size='small'>
                    <List.Item >
                        Created by: Mike Leys
                    </List.Item>
                </List>
            </Container>
        </Segment>
     );
}

export default MainFooter;